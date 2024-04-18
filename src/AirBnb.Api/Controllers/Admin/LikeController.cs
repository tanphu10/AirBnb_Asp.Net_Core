using AirBnb.Api.Extensions;
using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/like")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public LikeController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }
        [HttpPost]
        public async Task<IActionResult> CreateCommentAsync([FromBody] CreateUpdateLikeDto model)
        {
            var userId = User.GetUserId();
            var checkUser = await _userManager.FindByIdAsync(userId.ToString());
            if (checkUser == null)
            {
                return NotFound("không tìm thấy user");
            }
            var checkRoom = await _unitOfWork.Rooms.GetByIdAsync(model.RoomId);
            if (checkRoom == null)
            {
                return NotFound("không tìm thấy rooms");
            }
            var checkLike = await _unitOfWork.LikeRooms.FindLike(userId, model.RoomId);

            if (checkLike == null)
            {
                var data = _mapper.Map<CreateUpdateLikeDto, LikeRoom>(model);
                data.UserId = userId;
                data.Like = true;
                _unitOfWork.LikeRooms.Add(data);

            }
            else
            {
                if (checkLike.Like == true)
                {
                    checkLike.Like = false;
                    //_mapper.Map(model, checkLike);
                }
                else
                {
                    checkLike.Like = true;
                    //_mapper.Map(model, checkLike);
                }
            }

            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpGet("all")]
        public async Task<ActionResult<List<LikeRoom>>> GetAllLikes()
        {
            var data = await _unitOfWork.LikeRooms.GetAllAsync();
            return Ok(data);
        }
        [HttpGet("room/{roomid}")]
        public async Task<ActionResult<PagedResult<LikeInListDto>>> GetLikeRoom(Guid roomid, int pageIndex = 1, int pageSize = 10)
        {
            var data = await _unitOfWork.LikeRooms.GetLikes(roomid, pageIndex, pageSize);
            return Ok(data);
        }
        [HttpGet("user/{userid}")]
        public async Task<ActionResult<PagedResult<LikeInListDto>>> GetLikeUser(Guid userid, int pageIndex = 1, int pageSize = 10)
        {
            var data = await _unitOfWork.LikeRooms.GetUserLikes(userid, pageIndex, pageSize);
            return Ok(data);
        }
    }
}
