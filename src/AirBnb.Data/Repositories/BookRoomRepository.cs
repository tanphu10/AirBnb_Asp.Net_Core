using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Repositories;
using AirBnb.Data.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using static AirBnb.Core.Domain.Content.BookRooms;

namespace AirBnb.Data.Repositories
{
    public class BookRoomRepository : RepositoryBase<BookRooms, Guid>, IBookRoomRepository
    {
        private readonly AirBnbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public BookRoomRepository(AirBnbContext context, IMapper mapper, UserManager<AppUser> userManager) : base(context)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }


        public async Task<PagedResult<BookRoomInListDto>> GetAllPaging(string? keyword, int pageIndex = 1, int pageSize = 10)
        {
            var query = _context.BookRooms.AsQueryable();
            //if (!string.IsNullOrEmpty(keyword))
            //{
            //    //query= query.Where(x=>x.)
            //}
            var totalRow = await query.CountAsync();
            query.OrderByDescending(x => x.DateCheckIn).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<BookRoomInListDto>
            {
                Results = await _mapper.ProjectTo<BookRoomInListDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize
            };
        }

        public async Task<bool> GetDateBookRoomAsync(Guid roomId, DateTime checkIn, DateTime checkOut)
        {
            //var data = await _context.BookRooms.AnyAsync(x => x.RoomId == roomId && x.DateCheckout <= checkIn  && x.Status == BookRoomStatus.Approve && x.Status == BookRoomStatus.WaitingForApproval );
            var data = await _context.BookRooms.AnyAsync(x => x.RoomId == roomId && x.Status == BookRoomStatus.Approve &&
                                                   x.DateCheckIn <= checkOut &&
                                                   x.DateCheckout >= checkIn);
            return data;
        }
        public async Task SendRequestToOwner(Guid id, CreateUpdateBookRoomRequest model, Guid AuthorUserId)
        {
            var booked = await _context.BookRooms.FindAsync(id);
            if (booked == null)
            {
                throw new Exception("không tồn tại bookroom");
            }
            var user = await _userManager.FindByIdAsync(AuthorUserId.ToString());
            if (user == null)
            {
                throw new Exception("Không tồn tại user");
            }
            await _context.BookRoomActivityLogs.AddAsync(new BookRoomActivityLog()
            {
                Id = Guid.NewGuid(),
                FromStatus = booked.Status,
                ToStatus = BookRoomStatus.WaitingForApproval,
                UserId = user.Id,
                UserName = user?.UserName,
                RoomId = booked.Id,
                Note = $"{user?.UserName} gửi chờ duyệt"
            });
            booked.Status = BookRoomStatus.WaitingForApproval;
            var data = _mapper.Map(model, booked);
            _context.BookRooms.Update(booked);
        }
        public async Task ApproveRequest(Guid id, Guid currentUserId)
        {
            var bookroom = await _context.BookRooms.FindAsync(id);
            if (bookroom == null)
            { throw new Exception("không tồn tại book room"); }
            var user = await _context.Users.FindAsync(currentUserId);
            await _context.BookRoomActivityLogs.AddAsync(new BookRoomActivityLog
            {
                Id = Guid.NewGuid(),
                FromStatus = bookroom.Status,
                ToStatus = BookRoomStatus.Approve,
                UserId = currentUserId,
                UserName = user.UserName,
                RoomId = bookroom.RoomId,
                Note = $"{user?.UserName} duyệt bài"
            });
            bookroom.Status = BookRoomStatus.Approve;
            //bookroom.
            _context.BookRooms.Update(bookroom);
        }
        public async Task<List<BookRoomInListDto>> GetAllRoomBooked()
        {
            var bookedRooms = await _context.BookRooms.Where(x => x.Status == BookRoomStatus.Approve).ToListAsync();
            var bookedRoomsDto = bookedRooms.Select(room => new BookRoomInListDto
            {
                Id = room.Id,
                RoomId = room.RoomId,
                RoomName = room.RoomName,
                AuthorUserId = room.AuthorUserId,
                DateCheckIn = room.DateCheckIn,
                DateCheckout = room.DateCheckout,
                GuestNumber = room.GuestNumber,
                Status = room.Status,
            }).ToList();
            return bookedRoomsDto;
        }

        public async Task ReturnBackSubmit(Guid bookroomid, string reason, Guid currentUserId)
        {

            var bookroom = await _context.BookRooms.FindAsync(bookroomid);
            if (bookroom == null)
            {
                throw new Exception("không tồn tại bookroom");
            }
            var user = await _userManager.FindByIdAsync(currentUserId.ToString());
            if (user == null)
            {
                throw new Exception("user không tồn tại");

            }
            await _context.BookRoomActivityLogs.AddAsync(new BookRoomActivityLog()
            {
                Id = bookroom.Id,
                FromStatus = bookroom.Status,
                ToStatus = BookRoomStatus.Rejected,
                UserId = user.Id,
                UserName = user?.UserName,
                RoomId = bookroom.Id,
                Note = $"{user?.UserName} gửi return reject"
            });


        }
        public async Task<string> GetReturnReason(Guid bookId)
        {
            var data = await _context.BookRoomActivityLogs.
              Where(x => x.Id == bookId && x.ToStatus == BookRoomStatus.Rejected).OrderByDescending(x => x.DateCreated).FirstOrDefaultAsync();
            return data?.Note;
        }
    }
}
