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
        Task<List<CommentInListDto>> GetCommentsRoom(Guid roomid);
        Task<List<CommentInListDto>> GetCommentAllAsync();
        Task<CommentDto> GetCommentId(Guid id);
        Task<PagedResult<CommentInListDto>> GetAllPaging(string? keyword,Guid? roomId, int pageIndex, int pageSize);
    }
}
