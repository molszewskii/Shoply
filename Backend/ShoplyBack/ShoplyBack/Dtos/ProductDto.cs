using ShoplyBack.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoplyBack.Dtos
{
    public class ProductDto
    {
        public int ? Id { get; set; }
        public string ? Name { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        public decimal Price { get; set; }
        public string ? ImagePath { get; set; }
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public int? DeviceModelId { get; set; }
        public string? ModelName { get; set; }

    }
}
