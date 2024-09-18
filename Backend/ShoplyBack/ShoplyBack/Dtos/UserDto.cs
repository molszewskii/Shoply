using System.ComponentModel.DataAnnotations;

namespace ShoplyBack.Dtos
{
    public class UserDto
    {
        public string ? Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
