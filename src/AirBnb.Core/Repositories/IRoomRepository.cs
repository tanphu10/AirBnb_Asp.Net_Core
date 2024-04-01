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
    public interface IRoomRepository:IRepository<Room,Guid>
    {
        Task<List<Room>> GetPopularRoomsAsync(int count);
        Task<bool> IsSlugAlreadyExisted(string slug, Guid? currentId = null);

        Task<PagedResult<RoomInListDto>> GetRoomsPagingAsync(string keyword, Guid? categoryId, int pageIndex = 1, int pageSize = 10);
    }
}
