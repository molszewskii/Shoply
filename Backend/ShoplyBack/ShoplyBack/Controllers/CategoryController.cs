using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoplyBack.DbContexts;
using ShoplyBack.Dtos;
using ShoplyBack.Models;

namespace ShoplyBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ProductDbContext _productDbContext;

        public CategoryController(ProductDbContext productDbContext)
        {
            _productDbContext = productDbContext;
        }

        [HttpPost]
        [Route("createCategory")]
        public async Task<IActionResult> CreateCategory(CategoryDto categoryDto)
        {
            if (categoryDto == null)
            {
                return BadRequest("Category object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = new Category
            {
                CategoryName = categoryDto.CategoryName
            };

            _productDbContext.Categories.Add(category);
            await _productDbContext.SaveChangesAsync();
            return Ok(category);

        }

        [HttpGet]
        [Route("getCategories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _productDbContext.Categories.ToListAsync();
            if(categories == null || categories.Count == 0)
            {
                return NotFound("Categories were not found");
            }
            return Ok(categories);
        }
    }
}
