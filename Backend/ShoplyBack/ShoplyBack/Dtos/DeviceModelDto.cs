using ShoplyBack.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ShoplyBack.Dtos
{
    public class DeviceModelDto
    {
        public int ? Id { get; set; }

        [Required]
        public string ModelName { get; set; }

        public string? Specifications { get; set; }

        [Required]
        public int CategoryId { get; set; }

    }
}
