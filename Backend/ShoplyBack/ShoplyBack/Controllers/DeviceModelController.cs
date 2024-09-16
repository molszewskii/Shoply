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
    public class DeviceModelController : ControllerBase
    {
        private readonly ProductDbContext _productDbContext;

        public DeviceModelController(ProductDbContext productDbContext)
        {
            _productDbContext = productDbContext;
        }

        [HttpPost]
        [Route("createDeviceModel")]
        public async Task<IActionResult> CreateDeviceModel([FromBody] DeviceModelDto deviceModelDto)
        {
            if(deviceModelDto == null)
            {
                return BadRequest("DeviceModel object is null");
            }
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var categoryIdList = await _productDbContext.Categories.Select(i => i.Id).ToListAsync();
            if (!categoryIdList.Contains(deviceModelDto.CategoryId))
                return BadRequest("Please enter a proper category id");
            var device = new DeviceModel
            {
                ModelName = deviceModelDto.ModelName,
                Specifications = deviceModelDto.Specifications,
                CategoryId = deviceModelDto.CategoryId,
            };
            _productDbContext.DeviceModels.Add(device);
            await _productDbContext.SaveChangesAsync();
            return Ok(device);

        }

        [HttpGet]
        [Route("getDeviceModels/{categoryId}")]
        public async Task<IActionResult> GetDeviceModels(int categoryId)
        {
            var deviceModels = await _productDbContext.DeviceModels.Where(i => i.CategoryId == categoryId).Include(p=>p.Products).ToListAsync();
            if(deviceModels ==  null || deviceModels.Count == 0)
            {
                return NotFound("No device models were found");
            }
            return Ok(deviceModels);
        }
    }
}
