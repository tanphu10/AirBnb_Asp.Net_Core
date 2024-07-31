using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.SeedWorks;
using AirBnb.Core.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using static AirBnb.Core.Domain.Content.BookRooms;

namespace AirBnb.Data.Services
{
    public class BookService : IBookService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;
        public BookService(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        public async Task<BookRooms> MapRequestToBookRoomAsync(CreateUpdateBookRoomRequest model, Guid userId)
        {
            //check số người cần phải nhỏ hơn hoặc bằng số người của phòng
            //check ngày đó có người đặt phòng đó chưa nếu chưa thì mới cho đặt
            var checkDate = await _unitOfWork.BookRooms.GetDateBookRoomAsync(model.RoomId, model.DateCheckIn, model.DateCheckout);

            TimeSpan timeDifference = model.DateCheckout - model.DateCheckIn;

            int totalDays = timeDifference.Days;

            var room = await _unitOfWork.Rooms.GetByIdAsync(model.RoomId);
            if (room ==null)
            {
                throw new Exception("phòng không tồn tại");
            }
            int totalPrice = totalDays * room.Price;

            if (model.GuestNumber > room.Guest)
            {
                throw new Exception($"room này chỉ cho phép =< {room.Guest}");
            }
            if (checkDate)
            {
                throw new Exception("Room đã được đặt");
            }
            var data = _mapper.Map<CreateUpdateBookRoomRequest, BookRooms>(model);
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
            return data;
        }

     
    }
}
