using System.ComponentModel.DataAnnotations;

namespace ShoplyBack.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserEmail { get; set; }
        [Required]
        public string PasswordHash { get; set; }
    }
}
