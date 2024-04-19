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
    public interface ILikeRepository:IRepository<LikeRoom,Guid>
    {
        Task<LikeRoom>  FindLike(Guid userId,Guid roomId);
        Task<PagedResult<LikeInListDto>> GetLikes(Guid roomId, int pageIndex, int pageSize);
        
        Task<PagedResult<LikeInListDto>> GetUserLikes(Guid userId, int pageIndex, int pageSize);


    }
}
