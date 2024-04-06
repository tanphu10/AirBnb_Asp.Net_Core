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
    public interface IBookRoomRepository : IRepository<BookRooms, Guid>
    {
        Task<PagedResult<BookRoomInListDto>> GetAllPaging(string? keyword, int pageIndex = 1, int pageSize = 10);
        Task<bool> GetDateBookRoomAsync(Guid roomId, DateTime checkIn, DateTime checkOut);
        Task<List<BookRoomInListDto>> GetAllRoomBooked();
        Task SendRequestToOwner(Guid id, CreateUpdateBookRoomRequest model, Guid AuthorUserId
            );
        Task ApproveRequest(Guid id, Guid currentUserId);
        Task ReturnBackSubmit(Guid bookid, string reason, Guid currentUserId);
        Task<string> GetReturnReason(Guid bookId);
        //Task SenToApproveBookRoom(Guid id, Guid currentId);
    }
}
