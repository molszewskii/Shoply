using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShoplyBack.DbContexts;
using System.Security.Claims;
using ShoplyBack.Dtos;
using ShoplyBack.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ShoplyBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserDbContext _userDbContext;
        private readonly IConfiguration _configuration;

        public AuthController(UserDbContext userDbContext, IConfiguration configuration)
        {
            _userDbContext = userDbContext;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            if(await _userDbContext.Users.AnyAsync(u => u.UserEmail == userDto.Email))
            {
                return BadRequest("Email is already in use");
            }
            var user = new User
            {
                UserName = userDto.Name,
                UserEmail = userDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password)
            };
            _userDbContext.Users.Add(user);
            await _userDbContext.SaveChangesAsync();

            return Ok("User registered successfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto userDto)
        {
            var user = await _userDbContext.Users.SingleOrDefaultAsync(u=>u.UserEmail == userDto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
            {
                return Unauthorized();
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Issuer"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new {
                Token =  tokenString,
                User = new
                {
                    Name = user.UserName,
                    Email = user.UserEmail
                }
            });
        }
    }
}
