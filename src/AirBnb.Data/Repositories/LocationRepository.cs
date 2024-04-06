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
    public class LocationRepository : RepositoryBase<Location, Guid>, ILocationRepository
    {
        private readonly AirBnbContext _context;
        private readonly IMapper _mapper;
        public LocationRepository(AirBnbContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;

        }

        public async Task<PagedResult<LocationDto>> GetAllPaging(string? keyword, int pageIndex, int pageSize)
        {
            var query = _context.Locations.AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword));
                //|| x.province.Contains(keyword) || x.Nation.Contains(keyword));
            }
            var totalRow = await query.CountAsync();
            query = query.Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<LocationDto>
            {
                Results = await _mapper.ProjectTo<LocationDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize
            };

        }

        public Task<bool> IsSlugAlreadyExisted(string slug)
        {
            return _context.Locations.AnyAsync(x => x.Slug == slug);
        }
    }
}
