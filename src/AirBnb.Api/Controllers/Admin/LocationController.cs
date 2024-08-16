using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public LocationController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> CreateLocationAsync([FromBody] CreateUpdateLocationRequest model)
        {

            if (await _unitOfWork.Locations.IsSlugAlreadyExisted(model.Slug))
            {
                return BadRequest("đã tồn tại slug");
            }
            var location = _mapper.Map<CreateUpdateLocationRequest, Location>(model);
            _unitOfWork.Locations.Add(location);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpGet]
        [Route("all-location")]
        public async Task<ActionResult<List<LocationDto>>> GetAllLocationAsync()
        {
            var data = await _unitOfWork.Locations.GetAllAsync();
            return Ok(data);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetLocationByIdAsync(Guid id)
        {
            var data = await _unitOfWork.Locations.GetByIdAsync(id);
            return Ok(data);
        }
        [HttpGet("Paging")]
        public async Task<ActionResult<PagedResult<LocationDto>>> GetLocationPagingAsync(string? keyword, int pageIndex = 1, int pageSize = 10)
        {
            var data = await _unitOfWork.Locations.GetAllPaging(keyword, pageIndex, pageSize);
            return Ok(data);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateLocationAsync(Guid id, [FromBody] CreateUpdateLocationRequest model)
        {
            var location = await _unitOfWork.Locations.GetByIdAsync(id);
            if (location == null) return NotFound();
            _mapper.Map(model, location);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteLocationAsync([FromBody] Guid[] ids)
        {
            foreach (var id in ids)
            {
                var location = await _unitOfWork.Locations.GetByIdAsync(id);
                if (location == null) return NotFound();
                _unitOfWork.Locations.Remove(location);

            }
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
    }
}
