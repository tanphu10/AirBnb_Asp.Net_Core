using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Shared.Contracts;

namespace AirBnb.Core.Shared.Services
{
    public interface IBookService
    {
        Task<BookRooms> MapRequestToBookRoomAsync(CreateUpdateBookRoomRequest model, Guid userId);

        IScheduleJobService _schedulejob { get; }
    }
}
