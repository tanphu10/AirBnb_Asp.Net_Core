using AirBnb.Api.Extensions;
using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Helper;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using static AirBnb.Core.Domain.Content.BookRooms;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/book-room")]
    [ApiController]
    public class BookRoomController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public BookRoomController(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> CreateBookRoomAsync([FromBody] CreateUpdateBookRoomRequest model)
        {
            //check số người cần phải nhỏ hơn hoặc bằng số người của phòng
            //check ngày đó có người đặt phòng đó chưa nếu chưa thì mới cho đặt
            var checkDate = await _unitOfWork.BookRooms.GetDateBookRoomAsync(model.RoomId, model.DateCheckIn, model.DateCheckout);

            TimeSpan timeDifference = model.DateCheckout - model.DateCheckIn;

            int totalDays = timeDifference.Days;

            var room = await _unitOfWork.Rooms.GetByIdAsync(model.RoomId);
            int totalPrice = totalDays * room.Price;

            if (model.GuestNumber > room.Guest)
            {
                return BadRequest($"room này chỉ cho phép =< {room.Guest}");
            }
            if (checkDate)
            {
                return BadRequest("Room đã được đặt");
            }
            var data = _mapper.Map<CreateUpdateBookRoomRequest, BookRooms>(model);
            var userId = User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId.ToString());
            data.Id = Guid.NewGuid();
            data.AuthorUserId = user.Id;
            data.AuthorName = user.LastName;
            data.AuthorUserName = user.UserName;
            data.RoomName = room.Name;
            data.Status = BookRoomStatus.WaitingForApproval;
            data.IsPaid = false;
            // fix lại chổ này là lấy số ngày nhân với lại số tiền
            data.PayRoomAmount = totalPrice;
            _unitOfWork.BookRooms.Add(data);
            await _unitOfWork.CompleteAsync();
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBookRoom(Guid id, [FromBody] CreateUpdateBookRoomRequest request)
        {
            var data = await _unitOfWork.BookRooms.GetByIdAsync(id);
            if (data == null)
            {
                return NotFound();
            }
            _mapper.Map(request, data);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }

        [HttpGet]
        public async Task<ActionResult<List<BookRoomsDto>>> GetAllBookedRoomsAsync()
        {
            var booked = await _unitOfWork.BookRooms.GetAllAsync();
            return Ok(booked);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BookRoomsDto>> GetRoomIdAsync(Guid id)
        {
            var room = await _unitOfWork.BookRooms.GetByIdAsync(id);
            return Ok(room);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteBookRoomsAsync([FromBody] Guid[] ids)
        {
            foreach (var id in ids)
            {
                var checkId = await _unitOfWork.BookRooms.GetByIdAsync(id);
                if (checkId == null)
                {
                    return NotFound();
                }

                _unitOfWork.BookRooms.Remove(checkId);

            }
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpGet("Paging")]
        public async Task<ActionResult<PagedResult<BookRoomInListDto>>> GetAllPagingBookAsync(string? keyword, Guid? roomId, int pageIndex, int pageSize)
        {
            var data = await _unitOfWork.BookRooms.GetAllPaging(keyword, roomId, pageIndex, pageSize);
            return Ok(data);
        }

        [HttpGet("Room-Booked")]
        public async Task<ActionResult<List<BookRoomInListDto>>> GetAllRoomBookedAsync()
        {
            var data = await _unitOfWork.BookRooms.GetAllRoomBooked();
            return Ok(data);
        }

        [HttpGet("Room-Booked-user/{id}")]
        public async Task<ActionResult<List<BookRoomsDto>>> GetBookRoomUserId(Guid id)
        {
            var data = await _unitOfWork.BookRooms.getBookedUser(id);
            return Ok(data);
        }


        [HttpPut("edit-bookroom-submit/{bookid}")]
        public async Task<IActionResult> SendUpdateBookRoomAsync(Guid bookid, [FromBody] CreateUpdateBookRoomRequest model)
        {
            var checkDate = await _unitOfWork.BookRooms.GetDateBookRoomAsync(model.RoomId, model.DateCheckIn, model.DateCheckout);
            var AuthorUserId = User.GetUserId();
            if (!checkDate)
            {
                await _unitOfWork.BookRooms.SendRequestToOwner(bookid, model, AuthorUserId);
                await _unitOfWork.CompleteAsync();
                return Ok();
            }
            return BadRequest("phòng đã kín lịch");
        }
        [HttpPost("approve-submit/{bookid}")]
        public async Task<IActionResult> ApproveRequestBookRoomAsync(Guid bookid)
        {
            await _unitOfWork.BookRooms.ApproveRequest(bookid, User.GetUserId());
            await _unitOfWork.CompleteAsync();
            return Ok();
        }
        [HttpPost("return-back-submit/{bookid}")]
        public async Task<IActionResult> ReturnBackSubmit(Guid bookid, [FromBody] ReturnBackSubmitRequest model)
        {
            var currentUserId = User.GetUserId();
            await _unitOfWork.BookRooms.ReturnBackSubmit(bookid, model.Reason, currentUserId);
            await _unitOfWork.CompleteAsync();
            return Ok();
        }
        [HttpGet("return-reason/{bookid}")]
        public async Task<ActionResult<string>> GetReturnReasonAsync(Guid bookid)
        {
            var data = await _unitOfWork.BookRooms.GetReturnReason(bookid);
            return Ok(data);
        }
        [HttpGet("activity-logs/{bookid}")]
        public async Task<ActionResult<List<BookRoomActivityLogDto>>> GetActivityLog(Guid bookid)
        {
            var data = await _unitOfWork.BookRooms.GetActivityLogAsync(bookid);
            return Ok(data);
        }
    }
}
