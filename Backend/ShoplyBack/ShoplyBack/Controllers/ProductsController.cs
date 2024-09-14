using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoplyBack.DbContexts;
using ShoplyBack.Dtos;
using ShoplyBack.Models;

namespace ShoplyBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductDbContext _productDbContext;

        public ProductsController(ProductDbContext productDbContext)
        {
            _productDbContext = productDbContext;
        }
        [HttpPost]
        [Route("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateProduct([FromForm] ProductDto product, IFormFile file)
        {
            {
                try
                {
                    if (product == null)
                    {
                        return BadRequest("Product object is null.");
                    }

                    var item = new Product
                    {
                        Name = product.Name,
                        Price = product.Price,
                    };

                    if (file != null && file.Length > 0)
                    {
                        var fileName = Path.GetFileName(file.FileName);
                        var filePath = Path.Combine("Uploads", fileName);
                        int i = 1;
                        while (System.IO.File.Exists(filePath))
                        {
                            filePath = Path.Combine("Uploads", Path.GetFileNameWithoutExtension(file.FileName) + "_" + i + Path.GetExtension(file.FileName));
                            i++;
                        }

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        item.ImagePath = $"/Uploads/{fileName}";
                    }

                     _productDbContext.Products.Add(item);
                     await _productDbContext.SaveChangesAsync();

                    return Ok(item);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
                }
            }
        }




        [HttpGet]
        [Route("getProducts")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var products = await _productDbContext.Products
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    ImagePath = $"{baseUrl}{p.ImagePath}",
                }).ToListAsync();

            return Ok(products);
        }
    }
}
