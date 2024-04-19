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
    public class LikeRepository : RepositoryBase<LikeRoom, Guid>, ILikeRepository
    {
        private readonly AirBnbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public LikeRepository(AirBnbContext context, IMapper mapper, UserManager<AppUser> userManager) : base(context)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<LikeRoom> FindLike(Guid userId, Guid roomId)
        {
            return await _context.LikeRooms.Where(x => x.UserId == userId && x.RoomId == roomId).FirstOrDefaultAsync();
        }

        public async Task<PagedResult<LikeInListDto>> GetLikes(Guid roomId, int pageIndex, int pageSize)
        {
            var query = _context.LikeRooms.AsQueryable();

            query = query.Where(x => x.RoomId == roomId && x.Like == true);
            var totalRow = await query.CountAsync();
            query = query.OrderByDescending(x => x.DateCreated).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<LikeInListDto>
            {
                Results = await _mapper.ProjectTo<LikeInListDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize,
            };
        }
        public async Task<PagedResult<LikeInListDto>> GetUserLikes(Guid userId, int pageIndex, int pageSize)
        {
            var query = _context.LikeRooms.AsQueryable();

            query = query.Where(x => x.UserId == userId && x.Like == true);
            var totalRow = await query.CountAsync();
            query = query.OrderByDescending(x => x.DateCreated).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<LikeInListDto>
            {
                Results = await _mapper.ProjectTo<LikeInListDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize,
            };
        }
    }
}
