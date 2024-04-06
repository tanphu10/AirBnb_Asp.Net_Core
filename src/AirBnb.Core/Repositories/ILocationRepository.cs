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
    public interface ILocationRepository : IRepository<Location, Guid>
    {
        Task<bool> IsSlugAlreadyExisted(string slug);
        Task<PagedResult<LocationDto>> GetAllPaging(string? keyword, int pageIndex, int pageSize);

    }
}
