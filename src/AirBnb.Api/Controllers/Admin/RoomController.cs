using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/room")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public RoomController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] CreateUpdateRoomRequest request)
        {
            if (await _unitOfWork.Rooms.IsSlugAlreadyExisted(request.Slug))
            {
                return BadRequest("đã tồn tại slug");
            }
            var room = _mapper.Map<CreateUpdateRoomRequest, Room>(request);
            var roomId = Guid.NewGuid();
            var category = await _unitOfWork.RoomCategories.GetByIdAsync(request.CategoryId);
            room.Id = roomId;
            room.CategoryName = category.Name;
            room.Slug = category.Slug;
            //var userId = User.GetUserId();
            //var user = await _userManager.FindByIdAsync(userId.ToString());
            //room.AuthorUserName=
            //_unitOfWork.Rooms.Add(room);

            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(Guid id, [FromBody] CreateUpdateRoomRequest request)
        {
            var data = await _unitOfWork.Rooms.GetByIdAsync(id);
            if (data == null)
            {
                return NotFound();
            }
            _mapper.Map(request, data);

            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePosts([FromQuery] Guid[] ids)
        {
            foreach (var id in ids)
            {
                var data = await _unitOfWork.Rooms.GetByIdAsync(id);
                if (data == null)
                {
                    return NotFound();
                }
                _unitOfWork.Rooms.Remove(data);
            }
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<RoomDto>> GetRoomId(Guid id)
        {
            var data = await _unitOfWork.Rooms.GetByIdAsync(id);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }

        [HttpGet]
        [Route("paging")]
        public async Task<ActionResult<PagedResult<RoomInListDto>>> GetPostsPaging(string? keyword, Guid? categoryId,
            int pageIndex, int pageSize = 10)
        {
            var result = await _unitOfWork.Rooms.GetRoomsPagingAsync(keyword, categoryId, pageIndex, pageSize);
            return Ok(result);
        }
    }
}
