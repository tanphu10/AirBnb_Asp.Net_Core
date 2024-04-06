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
    public interface ICommentRepository:IRepository<Comments,Guid>
    {
        Task<List<CommentDto>> GetCommentsRoom(Guid roomid);
        Task<PagedResult<CommentDto>> GetAllPaging(string? keyword, int pageIndex, int pageSize);
    }
}
