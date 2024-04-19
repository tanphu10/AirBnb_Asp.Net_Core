using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Models.System;
using AirBnb.Core.Repositories;
using AirBnb.Core.SeedWorks.Constansts;
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

        public async Task AddTagToPost(Guid roomId, Guid tagId)
        {
            await _context.RoomTags.AddAsync(new RoomTag()
            {
                RoomId = roomId,
                TagId = tagId,
            });
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

        public async Task<List<RoomActivityLogDto>> GetActivityLogs()
        {
            var data = _context.RoomActivityLogs.DefaultIfEmpty();

            return await _mapper.ProjectTo<RoomActivityLogDto>(data).ToListAsync();

        }

        public async Task<PagedResult<RoomInListDto>> GetAllPaging(string? keyword, Guid currentUserId, Guid? categoryId, int pageIndex = 1, int pageSize = 10)
        {
            var user = await _userManager.FindByIdAsync(currentUserId.ToString());
            if (user == null)
            {
                throw new Exception("Không tồn tại user");
            }
            var roles = await _userManager.GetRolesAsync(user);
            var canApprove = false;
            if (roles.Contains(Roles.Admin))
            {
                canApprove = true;
            }
            else
            {
                canApprove = await _context.RoleClaims.AnyAsync(x => roles.Contains(x.RoleId.ToString())
                           && x.ClaimValue == Permissions.Rooms.Approve);
            }

            var query = _context.Rooms.AsQueryable();
            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword));
            }
            if (categoryId.HasValue)
            {
                query = query.Where(x => x.CategoryId == categoryId.Value);
            }

            if (!canApprove)
            {
                query = query.Where(x => x.AuthorUserId == currentUserId);
            }

            var totalRow = await query.CountAsync();

            query = query.OrderByDescending(x => x.DateCreated)
               .Skip((pageIndex - 1) * pageSize)
               .Take(pageSize);
            return new PagedResult<RoomInListDto>
            {
                Results = await _mapper.ProjectTo<RoomInListDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize
            };
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

        public async Task<PagedResult<RoomInListDto>> GetRoomsPagingApproveAsync(string? keyword, Guid currentUserId, Guid? categoryId = null, int pageIndex = 1, int pageSize = 10)
        {
            var user = await _userManager.FindByIdAsync(currentUserId.ToString());
            if (user == null)
            {
                throw new Exception("Không tồn tại user");
            }
            var roles = await _userManager.GetRolesAsync(user);
            var canApprove = false;
            if (roles.Contains(Roles.Admin))
            {
                canApprove = true;
            }
            else
            {
                canApprove = await _context.RoleClaims.AnyAsync(x => roles.Contains(x.RoleId.ToString())
                           && x.ClaimValue == Permissions.Rooms.Approve);
            }
            var query = _context.Rooms.AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword) && x.Status == RoomStatus.Published);
            }
            if (categoryId.HasValue)
            {
                query = query.Where(x => x.CategoryId == categoryId.Value && x.Status == RoomStatus.Published);
            }
            if (!canApprove)
            {
                query = query.Where(x => x.AuthorUserId == currentUserId);
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

        public async Task<List<string>> GetTagsByRoomtId(Guid roomId)
        {
            var query = from room in _context.Rooms
                        join pt in _context.RoomTags
                        on room.Id equals pt.RoomId
                        join t in _context.Tags
                        on pt.TagId equals t.Id
                        where room.Id == roomId
                        select t.Name;
            return await query.ToListAsync();
        }

        public Task<bool> IsSlugAlreadyExisted(string slug, Guid? currentId = null)
        {
            if (currentId.HasValue)
            {
                return _context.Rooms.AnyAsync(x => x.Slug == slug && x.Id != currentId.Value);
            }

            return _context.Rooms.AnyAsync(x => x.Slug == slug);

        }

        public async Task Approve(Guid id, Guid currentId)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                throw new Exception("không tồn tại room");
            }
            var user = await _context.Users.FindAsync(currentId);
            await _context.RoomActivityLogs.AddAsync(new RoomActivityLogs()
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
        public async Task ReturnBackSubmit(Guid id, Guid ownUserId, string note)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                throw new Exception("không tồn tại room");
            }
            var user = await _context.Users.FindAsync(ownUserId);
            await _context.RoomActivityLogs.AddAsync(new RoomActivityLogs()
            {
                Id = Guid.NewGuid(),
                FromStatus = room.Status,
                ToStatus = RoomStatus.Rejected,
                UserId = ownUserId,
                //UserName=user.UserName,
                RoomId = id,
                Note = note
            });
            room.Status = RoomStatus.Rejected;
            _context.Rooms.Update(room);
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
            await _context.RoomActivityLogs.AddAsync(new RoomActivityLogs()
            {
                Id = Guid.NewGuid(),
                FromStatus = room.Status,
                ToStatus = RoomStatus.WaitingForApproval,
                UserId = currentId,
                //UserName = user.UserName,
                RoomId = id,
                Note = $"  {user?.UserName} gửi chờ duyệt"
            });
            room.Status = RoomStatus.WaitingForApproval;
            _context.Rooms.Update(room);
        }

        public Task<List<TypeInListDto>> GetAllTypes(Guid roomId)
        {
            var query = from rit in _context.RoomInTypes
                        join s in _context.TypeRooms on rit.TypeId equals s.Id
                        join r in _context.Rooms on rit.RoomId equals r.Id
                        where rit.RoomId == roomId
                        select s;
            return _mapper.ProjectTo<TypeInListDto>(query).ToListAsync();
        }
    }
}
