using AirBnb.Api.Extensions;
using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AirBnb.Core.SeedWorks.Constansts;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
        private readonly UserManager<AppUser> _userManager;
        public RoomController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
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
            room.CategorySlug = category.Slug;
            var userId = User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId.ToString());
            room.AuthorUserName = user.UserName;
            room.AuthorUserId = userId;
            room.AuthorName = user.UserName;
            room.DateCreated = DateTime.Now;
            _unitOfWork.Rooms.Add(room);
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
        [Route("all-room")]
        public async Task<ActionResult<RoomDto>> GetAll()
        {
            var room = await _unitOfWork.Rooms.GetAllAsync();
            return Ok(room);
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
        [Route("paging-aprroval")]
        public async Task<ActionResult<PagedResult<RoomInListDto>>> GetPostsPagingApprove(string? keyword, Guid? categoryId, int pageIndex, int pageSize = 10)
        {
            var result = await _unitOfWork.Rooms.GetRoomsPagingApproveAsync(keyword, categoryId, pageIndex, pageSize);
            return Ok(result);
        }
        [HttpGet]
        [Route("series-belong/{id}")]
        public async Task<ActionResult<List<SeriesInListDto>>> GetSeriesBelong(Guid id)
        {
            var result = await _unitOfWork.Rooms.GetAllSeries(id);
            return Ok(result);
        }
        //userManger submit to admin
        [HttpPost("approval-submit/{roomid}")]
        public async Task<IActionResult> SendToApproveRoomPost(Guid roomid)
        {
            await _unitOfWork.Rooms.SenToApproveRoomPost(roomid, User.GetUserId());
            await _unitOfWork.CompleteAsync();
            return Ok();
        }
        [HttpPost("approval-room-post/{roomid}")]
        [Authorize(Permissions.Rooms.Approve)]
        public async Task<IActionResult> ApproveRoomPost(Guid roomid)
        {
            await _unitOfWork.Rooms.Approve(roomid, User.GetUserId());
            await _unitOfWork.CompleteAsync();
            return Ok();
        }
        [HttpPost("return-back-submit/{id}")]
        public async Task<IActionResult> ReturnBackSubmit(Guid id, [FromBody] ReturnBackSubmitRequest model)
        {
            var currentUserId = User.GetUserId();
            await _unitOfWork.Rooms.ReturnBackSubmit(id, model.Reason, currentUserId);
            return Ok();
        }
        [HttpGet("return-reason/{roomid}")]
        public async Task<ActionResult<string>> GetReturnReason(Guid roomid)
        {
            var data = await _unitOfWork.Rooms.GetReturnReasonAsync(roomid);
            return Ok(data);
        }

        [HttpGet("activity-logs/{roomid}")]
        public async Task<ActionResult<List<RoomActivityLogDto>>> GetActivityLog(Guid roomid)
        {
            var data = await _unitOfWork.Rooms.GetActivityLogAsync(roomid);
            return Ok(data);
        }
        [HttpGet("latest-publish-room")]
        public async Task<ActionResult<List<RoomInListDto>>> GetLatestPublishRoomAsync([FromQuery] int top=10)
        {
            var data = await _unitOfWork.Rooms.GetLatestPublishRoom(top);
            return Ok(data);

        }
    }
}
