using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models.Content;

namespace AirBnb.Core.Shared.Services
{
    public interface IRoomService
    {
        Task<Room> MapRequestToRoomAsync(CreateUpdateRoomRequest request, Guid userId);
    }
}
