using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Repositories;
using AirBnb.Data.SeedWorks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Data.Repositories
{
    public class CommentRepository : RepositoryBase<Comments, Guid>, ICommentRepository
    {
        private readonly AirBnbContext _context;
        private readonly IMapper _mapper;
        public CommentRepository(AirBnbContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PagedResult<CommentDto>> GetAllPaging(string? keyword, int pageIndex, int pageSize)
        {

            var query = _context.Comments.AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Content.Contains(keyword));

            }
            var totalRow = await query.CountAsync();
            query = query.OrderByDescending(x => x.DateCreated).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<CommentDto>
            {
                Results = await _mapper.ProjectTo<CommentDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize,
            };

        }

        public async Task<List<CommentDto>> GetCommentsRoom(Guid roomid)
        {
            var room = await _context.Rooms.FindAsync(roomid);
            if (room == null)
            {
                throw new Exception("không tồn tại room");
            }
            var data = from c in _context.Comments
                       join r in _context.Rooms
                       on c.RoomId equals r.Id
                       where c.RoomId == roomid
                       select c;
            return _mapper.ProjectTo<CommentDto>(data).ToList();
        }
    }
}
