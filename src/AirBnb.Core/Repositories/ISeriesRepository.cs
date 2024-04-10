using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Repositories
{
    public interface ISeriesRepository : IRepository<Series, Guid>
    {
        Task<bool> IsSlugAlreadyExisted(string slug);
        Task<bool> IsRoomInSeries(Guid seriesId, Guid roomId);
        Task<PagedResult<SeriesInListDto>> GetAllPagingSeries(string? keyword,int pageIndex = 1, int pageSize = 10);
        Task AddRoomSeries(Guid roomId, Guid seriesId,int displaypOrder);
        Task<List<RoomInListDto>> GetAllRoomSeries(Guid id);
        Task RemoveRoomToSeries(Guid seriesId, Guid roomId);


    }
}
