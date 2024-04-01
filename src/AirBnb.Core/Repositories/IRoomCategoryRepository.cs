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
    public interface IRoomCategoryRepository :IRepository<RoomCategory,Guid>
    {
        Task<PagedResult<RoomCategoryDto>> GetCategoryPagingAsync(string keyword, int pageIndex = 1, int pageSize = 10);

    }
}
