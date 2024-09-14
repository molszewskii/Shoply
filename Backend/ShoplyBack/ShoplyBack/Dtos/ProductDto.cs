using System.ComponentModel.DataAnnotations;

namespace ShoplyBack.Dtos
{
    public class ProductDto
    {
        public int ? Id { get; set; }
        public string ? Name { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        public decimal Price { get; set; }
        public string ? ImagePath { get; set; }

    }
}
