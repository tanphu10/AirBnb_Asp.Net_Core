using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Repositories;
using AirBnb.Data.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AirBnb.Data.Repositories
{
    public class RoomRepository : RepositoryBase<Room, Guid>, IRoomRepository
    {
        private readonly AirBnbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public RoomRepository(AirBnbContext context, IMapper mapper, UserManager<AppUser> userManager) : base(context)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task Approve(Guid id, Guid currentId)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                throw new Exception("không tồn tại room");
            }
            var user = await _context.Users.FindAsync(currentId);
            await _context.RoomActivityLogs.AddAsync(new RoomActivityLog()
            {
                Id = Guid.NewGuid(),
                FromStatus = room.Status,
                ToStatus = RoomStatus.Published,
                UserId = currentId,
                //UserName=user.UserName,
                RoomId = id,
                Note = $"{user?.UserName} duyệt bài"
            });
            room.Status = RoomStatus.Published;
            _context.Rooms.Update(room);
        }

        public async Task<List<RoomActivityLogDto>> GetActivityLogAsync(Guid id)
        {

            var query = await _context.RoomActivityLogs
                .Where(x => x.RoomId == id)
                .OrderByDescending(x => x.DateCreated)
                .SelectMany(log => _context.Users
                .Where(user => user.Id == log.UserId)
                .DefaultIfEmpty(), (log, user) => new RoomActivityLogDto
                {
                    Id = log.Id,
                    RoomId = log.RoomId,
                    DateCreated = log.DateCreated,
                    UserId = user.Id,
                    UserName = user.UserName,
                    FromStatus = log.FromStatus,
                    ToStatus = log.ToStatus,
                    Note = log.Note,
                }).ToListAsync();
            return query;
        }

        public Task<List<SeriesInListDto>> GetAllSeries(Guid roomId)
        {
            var query = from ris in _context.RoomInSeries
                        join s in _context.Series on ris.SeriesId equals s.Id
                        join r in _context.Rooms on ris.RoomId equals r.Id
                        where ris.RoomId == roomId
                        select s;
            return _mapper.ProjectTo<SeriesInListDto>(query).ToListAsync();

        }
        public async Task<List<RoomInListDto>> GetLatestPublishRoom(int top)
        {
            var data = _context.Rooms.Where(x => x.Status == RoomStatus.Published).Take(top).OrderByDescending(x => x.DateCreated);

            return await _mapper.ProjectTo<RoomInListDto>(data).ToListAsync();
        }

        public Task<List<Room>> GetPopularRoomsAsync(int count)
        {
            return _context.Rooms.OrderByDescending(x => x.ViewCount).Take(count).ToListAsync();
        }

        public async Task<string> GetReturnReasonAsync(Guid id)
        {

            var data = await _context.RoomActivityLogs.
                Where(x => x.RoomId == id && x.ToStatus == RoomStatus.Rejected).OrderByDescending(x => x.DateCreated).FirstOrDefaultAsync();
            return data?.Note;
        }

        public async Task<PagedResult<RoomInListDto>> GetRoomsPagingApproveAsync(string? keyword, Guid? categoryId, int pageIndex = 1, int pageSize = 10)
        {
            var query = _context.Rooms.AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword) && x.Status == RoomStatus.Published);
            }
            if (categoryId.HasValue)
            {
                query = query.Where(x => x.CategoryId == categoryId.Value && x.Status == RoomStatus.Published);
            }
            var totalRow = await query.CountAsync();
            query = query.Where(x => x.Status == RoomStatus.Published).OrderByDescending(x => x.DateCreated).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<RoomInListDto>
            {
                Results = await _mapper.ProjectTo<RoomInListDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize
            };
        }

        public Task<bool> IsSlugAlreadyExisted(string slug, Guid? currentId = null)
        {
            if (currentId.HasValue)
            {
                return _context.Rooms.AnyAsync(x => x.Slug == slug && x.Id != currentId.Value);
            }

            return _context.Rooms.AnyAsync(x => x.Slug == slug);

        }

        public async Task ReturnBackSubmit(Guid id, string reason, Guid ownUserId)
        {

            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                throw new Exception("không tồn tại room");
            }
            var user = await _userManager.FindByIdAsync(ownUserId.ToString());
            if (user == null)
            {
                throw new Exception("user không tồn tại");

            }
            await _context.RoomActivityLogs.AddAsync(new RoomActivityLog()
            {
                RoomId = id,
                FromStatus = room.Status,
                ToStatus = RoomStatus.Rejected,
                Note = reason,
                UserId = user.Id,
            });


        }

        public async Task SenToApproveRoomPost(Guid id, Guid currentId)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                throw new Exception("không tồn tại room");
            }
            var user = await _context.Users.FindAsync(currentId);
            if (user == null)
            {
                throw new Exception("không tồn tại user");
            }
            await _context.RoomActivityLogs.AddAsync(new RoomActivityLog()
            {
                Id = Guid.NewGuid(),
                FromStatus = room.Status,
                ToStatus = RoomStatus.WaitingForApproval,
                UserId = currentId,
                //UserName=user.UserName,
                RoomId = id,
                Note = $"{user?.UserName} duyệt bài"
            });
            room.Status = RoomStatus.WaitingForApproval;
            _context.Rooms.Update(room);
        }
    }
}
