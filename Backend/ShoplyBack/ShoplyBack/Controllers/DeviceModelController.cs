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
        [Route("device-models")]
        public async Task<IActionResult> GetDeviceModels()
        {
            var deviceModels = await _productDbContext.DeviceModels.ToListAsync();
            return Ok(deviceModels);
        }

        [HttpGet]
        [Route("getDeviceModelsByCategoryId/{categoryId}")]
        public async Task<IActionResult> GetDeviceModelsByCategoryId(int categoryId)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            var deviceModels = await _productDbContext.DeviceModels
                .Where(i => i.CategoryId == categoryId)
                .Include(p => p.Products)
                .Select(dm => new
                {
                    dm.Id,
                    dm.ModelName,
                    Products = dm.Products.Select(p => new
                    {
                        p.Id,
                        p.Name,
                        p.Price,
                        ImagePath = $"{baseUrl}{p.ImagePath}",
                        p.CategoryId,
                        p.DeviceModelId,
                        p.DeviceModel.ModelName,
                    }).ToList()
                })
                .ToListAsync();

            if (deviceModels == null || deviceModels.Count == 0)
            {
                return NotFound("No device models were found");
            }

            return Ok(deviceModels);
        }

        [HttpGet]
        [Route("getDeviceInfoById/{productId}")]
        public async Task<IActionResult> GetDeviceInfoById(int productId)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var product = await _productDbContext.Products.FirstOrDefaultAsync(p => p.Id == productId);
            DeviceModel? deviceModel = null;
            if (product != null)
            {
                deviceModel = await _productDbContext.DeviceModels.Where(d => d.Id == product.DeviceModelId).FirstOrDefaultAsync();
                if (deviceModel?.Products != null)
                {
                    foreach (var p in deviceModel.Products)
                    {
                        p.ImagePath = $"{baseUrl}{p.ImagePath}";
                    }
                }
            }

            var productInfo = new
            {
                DeviceModel = deviceModel
            };
            return Ok(productInfo);
        }

    }
}
