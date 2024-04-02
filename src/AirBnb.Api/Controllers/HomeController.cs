using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AirBnb.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public HomeController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<ActionResult<RoomInListDto>> GetAll()
        {
            var data = await _unitOfWork.Rooms.GetAllAsync();
            return Ok(data);
        }
    }
}
