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
    public class SeriesRepository : RepositoryBase<Series, Guid>, ISeriesRepository
    {
        private readonly IMapper _mapper;
        private readonly AirBnbContext _context;
        public SeriesRepository(AirBnbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task AddRoomSeries(Guid roomId, Guid seriesId, int displaypOrder)
        {
            var data = await _context.RoomInSeries.FirstOrDefaultAsync(x => x.SeriesId == seriesId && x.RoomId == roomId);
            if (data == null)
            {
                await _context.RoomInSeries.AddAsync(new RoomInSeries()
                {
                    SeriesId = seriesId,
                    RoomId = roomId,
                    DisplayOrder = displaypOrder,
                });
            }
        }

        public async Task<PagedResult<SeriesInListDto>> GetAllPagingSeries(string? keyword, int pageIndex = 1, int pageSize = 10)
        {
            var query = _context.Series.AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword));
            }
            var totalRow = await query.CountAsync();
            query.OrderByDescending(x => x.DateCreated).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<SeriesInListDto>
            {
                Results = await _mapper.ProjectTo<SeriesInListDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize
            };
        }
        public async Task RemoveRoomToSeries(Guid seriesId, Guid roomId)
        {
            var postInSeries = await _context.RoomInSeries
                .FirstOrDefaultAsync(x => x.RoomId == roomId && x.SeriesId == seriesId);
            if (postInSeries != null)
            {
                _context.RoomInSeries.Remove(postInSeries);
            }
        }
        public Task<List<RoomInListDto>> GetAllRoomSeries(Guid id)
        {
            var query = from ris in _context.RoomInSeries
                        join r in _context.Rooms
                        on ris.RoomId equals r.Id
                        where ris.SeriesId == id
                        select r;
            return _mapper.ProjectTo<RoomInListDto>(query).ToListAsync();

        }

        public async Task<bool> IsRoomInSeries(Guid seriesId, Guid roomId)
        {
            var data = await _context.RoomInSeries.AnyAsync(x => x.SeriesId == seriesId && x.RoomId == roomId);
            return data;
        }

        public Task<bool> IsSlugAlreadyExisted(string slug)
        {

            return _context.Series.AnyAsync(x => x.Slug == slug);

        }
    }
}
