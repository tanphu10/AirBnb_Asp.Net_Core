using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;

namespace AirBnb.Core.Repositories
{
    public interface IRoomRepository : IRepository<Room, Guid>
    {
        Task<PagedResult<RoomInListDto>> GetAllPaging(string? keyword, Guid currentUserId, Guid? categoryId, int pageIndex = 1, int pageSize = 10);

        Task<List<Room>> GetPopularRoomsAsync(int count);
        Task<bool> IsSlugAlreadyExisted(string slug, Guid? currentId = null);
        Task<List<SeriesInListDto>> GetAllSeries(Guid roomId);
        Task AddTagToPost(Guid roomId, Guid tagId);
        Task SenToApproveRoomPost(Guid id, Guid currentId);
        Task Approve(Guid id, Guid currentId);
        Task<PagedResult<RoomInListDto>> GetRoomsPagingApproveAsync(string? keyword, Guid currentUserId, Guid? categoryId=null, int pageIndex = 1, int pageSize = 10);
        Task ReturnBackSubmit(Guid id, Guid OwnUserId, string note);
        Task<string> GetReturnReasonAsync(Guid id);
        Task<List<RoomActivityLogDto>> GetActivityLogAsync(Guid id);
        Task<List<RoomInListDto>> GetLatestPublishRoom(int top);
        Task<List<string>> GetTagsByRoomtId(Guid roomId);

        Task<List<RoomActivityLogDto>> GetActivityLogs();
    }
}
