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

        public async Task<PagedResult<CommentInListDto>> GetAllPaging(string? keyword,Guid? roomId, int pageIndex, int pageSize)
        {

            var query = from c in _context.Comments.AsQueryable()
                        join u in _context.Users on c.UserId equals u.Id
                        join r in _context.Rooms on c.RoomId equals r.Id
                        select new CommentInListDto
                        {
                            Id = c.Id,
                            RoomId = c.RoomId,
                            RoomName = r.Name,
                            UserId = c.UserId,
                            DateCreated = c.DateCreated,
                            Content = c.Content,
                            AuthorUserName = u.UserName,
                        };

            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.RoomName.Contains(keyword));

            }
            if (roomId.HasValue)
            {
                query = query.Where(x => x.RoomId == roomId);
            }
            var totalRow = await query.CountAsync();
            query = query.OrderByDescending(x => x.DateCreated).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<CommentInListDto>
            {
                Results = await _mapper.ProjectTo<CommentInListDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize,
            };

        }

        public async Task<List<CommentInListDto>> GetCommentAllAsync()
        {
            var data = from c in _context.Comments
                       join r in _context.Rooms
                       on c.RoomId equals r.Id
                       join u in _context.Users on c.UserId equals u.Id
                       select new CommentInListDto
                       {
                           Id = c.Id,
                           RoomId = c.RoomId,
                           RoomName = r.Name,
                           UserId = c.UserId,
                           DateCreated = c.DateCreated,
                           Content = c.Content,
                           AuthorUserName = u.UserName,
                       };
            return _mapper.ProjectTo<CommentInListDto>(data).ToList();
        }

        public async Task<CommentDto> GetCommentId(Guid id)
        {
            var data = await (from c in _context.Comments
                        join r in _context.Rooms
                        on c.RoomId equals r.Id
                        join u in _context.Users on c.UserId equals u.Id
                        where c.Id == id
                        select new CommentDto
                        {
                            Id = c.Id,
                            RoomId = r.Id,
                            RoomName = r.Name,
                            UserId = c.UserId,
                            DateCreated = c.DateCreated,
                            Content = c.Content,
                            AuthorUserName = u.UserName,
                        }).FirstOrDefaultAsync();

            return _mapper.Map<CommentDto>(data);
        }

        public async Task<List<CommentInListDto>> GetCommentsRoom(Guid roomid)
        {
            var room = await _context.Rooms.FindAsync(roomid);
            if (room == null)
            {
                throw new Exception("không tồn tại room");
            }
            var data = from c in _context.Comments
                       join r in _context.Rooms
                       on c.RoomId equals r.Id
                       join u in _context.Users on c.UserId equals u.Id
                       where c.RoomId == roomid
                       select new CommentInListDto
                       {
                           Id = c.Id,
                           RoomId = room.Id,
                           RoomName = room.Name,
                           UserId = c.UserId,
                           DateCreated = c.DateCreated,
                           Content = c.Content,
                           AuthorUserName = u.UserName,
                       };
            return _mapper.ProjectTo<CommentInListDto>(data).ToList();
        }
    }
}
