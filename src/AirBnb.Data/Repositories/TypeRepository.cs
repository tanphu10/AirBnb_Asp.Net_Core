using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Models;
using AirBnb.Core.Repositories;
using AirBnb.Data.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Data.Repositories
{
    public class TypeRepository:RepositoryBase<TypeRoom,Guid>,ITypeRepository
    {
        private readonly AirBnbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public TypeRepository(AirBnbContext context, IMapper mapper, UserManager<AppUser> userManager) : base(context)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }
        public async Task<PagedResult<TypeInListDto>> GetAllPaging(string? keyword, int pageIndex, int pageSize)
        {
            var query = _context.TypeRooms.AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.TypeName.Contains(keyword));
            }
            var totalRow = await query.CountAsync();
            query = query.Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<TypeInListDto>
            {
                Results = await _mapper.ProjectTo<TypeInListDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize
            };

        }

        public Task<bool> IsSlugAlreadyExisted(string slug)
        {
            return _context.TypeRooms.AnyAsync(x => x.Slug == slug);
        }

    }
}
