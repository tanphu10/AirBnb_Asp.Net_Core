﻿using AirBnb.Api.Extensions;
using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Helper;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AirBnb.Core.SeedWorks.Constansts;
using AirBnb.Core.Shared.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static AirBnb.Core.SeedWorks.Constansts.Permissions;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/room")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IRoomService _roomService;
        public RoomController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager,IRoomService roomService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            _roomService = roomService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] CreateUpdateRoomRequest request)
        {
            if (await _unitOfWork.Rooms.IsSlugAlreadyExisted(request.Slug))
            {
                return BadRequest("đã tồn tại slug");
            }
            
            var userId = User.GetUserId();
            var room = await _roomService.MapRequestToRoomAsync(request, userId);
            _unitOfWork.Rooms.Add(room);
            // process tag
            if (request.Tags != null && request.Tags.Length > 0)
            {
                foreach (var tagName in request.Tags)
                {
                    var tagSlug = TextHelper.ToUnsignedString(tagName);
                    var tag = await _unitOfWork.Tags.GetBySlug(tagSlug);
                    Guid tagId;
                    if (tag == null)
                    {
                        tagId = Guid.NewGuid();
                        _unitOfWork.Tags.Add(new Tag() { Id = tagId, Name = tagName, Slug = tagSlug });

                    }
                    else
                    {
                        tagId = tag.Id;
                    }
                    await _unitOfWork.Rooms.AddTagToPost(room.Id, tagId);
                }
            }
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
        public async Task<IActionResult> DeleteRooms([FromQuery] Guid[] ids)
        {
            foreach (var id in ids)
            {
                var data = await _unitOfWork.Rooms.GetByIdAsync(id); ;
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
        public async Task<ActionResult<List<RoomDto>>> GetAllRequest()
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
        [Route("paging")]
        [Authorize(Rooms.View)]
        public async Task<ActionResult<PagedResult<RoomInListDto>>> GetRoomsPaging(string? keyword, Guid? categoryId,
         int pageIndex = 1, int pageSize = 10)
        {
            var userId = User.GetUserId();
            var result = await _unitOfWork.Rooms.GetAllPaging(keyword, userId, categoryId, pageIndex, pageSize);
            return Ok(result);
        }
        [HttpGet]
        [Route("paging-aprroval")]
        [Authorize(Rooms.View)]
        public async Task<ActionResult<PagedResult<RoomInListDto>>> GetRoomsPagingApprove(string? keyword, Guid? categoryId = null, int pageIndex = 1, int pageSize = 10)
        {
            var userId = User.GetUserId();
            var result = await _unitOfWork.Rooms.GetRoomsPagingApproveAsync(keyword, userId, categoryId, pageIndex, pageSize);
            return Ok(result);
        }
        [HttpGet]
        [Route("series-belong/{id}")]
        public async Task<ActionResult<List<SeriesInListDto>>> GetSeriesBelong(Guid id)
        {
            var result = await _unitOfWork.Rooms.GetAllSeries(id);
            return Ok(result);
        }
        [HttpGet]
        [Route("types-belong/{id}")]
        public async Task<ActionResult<List<TypeInListDto>>> GetTypesBelong(Guid id)
        {
            var result = await _unitOfWork.Rooms.GetAllTypes(id);
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
        public async Task<IActionResult> ReturnBackSubmitRequest(Guid id, [FromBody] ReturnBackSubmitRequest model)
        {
            var currentUserId = User.GetUserId();
            await _unitOfWork.Rooms.ReturnBackSubmit(id, currentUserId, model.Reason);
            await _unitOfWork.CompleteAsync();
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
        public async Task<ActionResult<List<RoomInListDto>>> GetLatestPublishRoomAsync([FromQuery] int top = 10)
        {
            var data = await _unitOfWork.Rooms.GetLatestPublishRoom(top);
            return Ok(data);
        }
        [HttpGet("tags")]
        [Authorize(Rooms.View)]
        public async Task<ActionResult<List<string>>> GetAllTags()
        {
            var logs = await _unitOfWork.Tags.GetAllTags();
            return Ok(logs);
        }
        [HttpGet("tags/{id}")]
        [Authorize(Rooms.View)]
        public async Task<ActionResult<List<string>>> GetRoomTags(Guid id)
        {
            var tagName = await _unitOfWork.Rooms.GetTagsByRoomtId(id);
            return Ok(tagName);
        }
        [HttpGet("roomActivityLog")]
        //[Authorize(Rooms.Edit)] 
        public async Task<ActionResult<List<RoomActivityLogDto>>> GetRoomActivityLogs()
        {
            var tagName = await _unitOfWork.Rooms.GetActivityLogs();
            return Ok(tagName);
        }
    }
}
