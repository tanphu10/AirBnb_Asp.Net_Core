using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Models;
using AirBnb.Core.SeedWorks;

namespace AirBnb.Core.Repositories
{
    public interface ITypeRepository:IRepository<TypeRoom,Guid>
    {
        Task<bool> IsSlugAlreadyExisted(string slug);
        Task<PagedResult<TypeInListDto>> GetAllPaging(string? keyword, int pageIndex, int pageSize);

        Task<bool> IsRoomInTypes(Guid typeId, Guid roomId);
        Task AddRoomTypes(Guid roomId, Guid typeId, int displaypOrder);
        Task RemoveRoomFromTypes(Guid typeId, Guid roomId);
        Task<List<RoomInListDto>> GetAllRoomTypes(Guid id);


    }
}
