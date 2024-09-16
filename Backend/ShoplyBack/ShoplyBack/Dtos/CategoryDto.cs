using System.ComponentModel.DataAnnotations;

namespace ShoplyBack.Dtos
{
    public class CategoryDto
    {
        public int ? Id { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "Category name cannot be longer than 100 characters.")]
        public string CategoryName { get; set; }

    }
}
