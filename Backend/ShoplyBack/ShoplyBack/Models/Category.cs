using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ShoplyBack.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string CategoryName { get; set; }
        [JsonIgnore]
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
