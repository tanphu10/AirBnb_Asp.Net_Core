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
    public class RoomCategoryRepository : RepositoryBase<RoomCategory, Guid>, IRoomCategoryRepository
    {
        private readonly AirBnbContext _context;
        private readonly IMapper _mapper;

        public RoomCategoryRepository(AirBnbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<PagedResult<RoomCategoryDto>> GetCategoryPagingAsync(string keyword, int pageIndex = 1, int pageSize = 10)
        {
            var query = _context.RoomCategories.AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword));
            }
            var totalRow = await query.CountAsync();
            query = query.OrderByDescending(x => x.DateCreated).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<RoomCategoryDto>
            {
                Results = await _mapper.ProjectTo<RoomCategoryDto>(query).ToListAsync(),
                RowCount = totalRow,
                CurrentPage = pageIndex,
                PageSize = pageSize

            };

        }
    }
}
