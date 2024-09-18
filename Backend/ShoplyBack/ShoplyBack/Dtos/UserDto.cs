using System.ComponentModel.DataAnnotations;

namespace ShoplyBack.Dtos
{
    public class UserDto
    {
        public string ? UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
