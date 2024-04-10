using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CategoryController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoomCategory([FromBody] CreateUpdateCategoryRequest request)
        {
            var data = _mapper.Map<CreateUpdateCategoryRequest, RoomCategory>(request);
            _unitOfWork.RoomCategories.Add(data);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoomCategory(Guid id, [FromBody] CreateUpdateCategoryRequest request)
        {
            var data = await _unitOfWork.RoomCategories.GetByIdAsync(id);
            if (data == null)
            {
                return NotFound();
            }
            _mapper.Map(request, data);

            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpGet("all/item")]
        public async  Task<ActionResult<List<RoomCategoryDto>>> GetAllRoomCategory()
        {
            var data = await _unitOfWork.RoomCategories.GetAllAsync();
            return Ok(data);

        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteRoomCategory([FromQuery] Guid[] ids)
        {
            foreach (var id in ids)
            {
                var data = await _unitOfWork.RoomCategories.GetByIdAsync(id);
                if (data == null)
                {
                    return NotFound();
                }
                if (await _unitOfWork.RoomCategories.HasPost(id))
                {
                    return BadRequest("Danh mục đang chứa bài viết, không thể xóa");
                }
                _unitOfWork.RoomCategories.Remove(data);
            }
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<RoomCategoryDto>> GetRoomCategoryId(Guid id)
        {
            var data = await _unitOfWork.RoomCategories.GetByIdAsync(id);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }

        [HttpGet]
        [Route("paging")]
        public async Task<ActionResult<PagedResult<RoomCategoryDto>>> GetRoomCategoryPaging(string? keyword, int pageIndex, int pageSize = 10)
        {
            var result = await _unitOfWork.RoomCategories.GetCategoryPagingAsync(keyword, pageIndex, pageSize);
            return Ok(result);
        }
    }
}
