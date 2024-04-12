using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Repositories;
using AirBnb.Core.SeedWorks;
using AirBnb.Data.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
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
                Note = $"{user?.UserName} duyệt đặt phòng"
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
            var user = await _context.Users.FindAsync(currentUserId);

            var data = await _context.BookRoomActivityLogs.AddAsync(new BookRoomActivityLog()
            {
                Id = Guid.NewGuid(),
                RoomId = bookroomid,
                FromStatus = bookroom.Status,
                ToStatus = BookRoomStatus.Rejected,
                Note = reason,
                UserId = currentUserId,
                UserName = user?.UserName,
            });
            bookroom.Status = BookRoomStatus.Rejected;
            _context.BookRooms.Update(bookroom);
        }
        public async Task<string> GetReturnReason(Guid bookId)
        {
            //chổ này đổi lại RoomId thành BookID
            var data = await _context.BookRoomActivityLogs.
              Where(x => x.RoomId == bookId && x.ToStatus == BookRoomStatus.Rejected).OrderByDescending(x => x.DateCreated).FirstOrDefaultAsync();
            return data?.Note;
        }

        public async Task<List<BookRoomActivityLogDto>> GetActivityLogAsync(Guid id)
        {
            var data = await _context.BookRoomActivityLogs.Where(x => x.RoomId == id).OrderByDescending(x => x.DateCreated).ToListAsync();
            var activity = data.Select(act => new BookRoomActivityLogDto
            {
                Id = act.Id,
                RoomId = act.RoomId,
                FromStatus = act.FromStatus,
                ToStatus = act.ToStatus,
                DateCreated = act.DateCreated,
                Note = act.Note,
                UserId = act.UserId,
                UserName = act.UserName,
            }).ToList();
            return activity;
        }




        //public async Task SenToApproveBookRoom(Guid id,Guid currentId)
        //{
        //    var book = await _context.BookRooms.FindAsync(id);
        //    if (book == null)
        //    {
        //        throw new Exception("không tồn tại book room");
        //    }
        //    var user = await _context.Users.FindAsync(currentId);
        //    if (user == null)
        //    {
        //        throw new Exception("không tồn tại user");
        //    }
        //    await _context.BookRoomActivityLogs.AddAsync(new BookRoomActivityLog()
        //    {
        //        Id = Guid.NewGuid(),
        //        FromStatus = book.Status,
        //        ToStatus = BookRoomStatus.WaitingForApproval,
        //        UserId = user.Id,
        //        UserName = user?.UserName,
        //        RoomId = book.Id,
        //        Note = $"{user?.UserName} gửi chờ duyệt"
        //    });
        //    book.Status = BookRoomStatus.WaitingForApproval;
        //    _context.BookRooms.Update(book);
        //}
    }
}
