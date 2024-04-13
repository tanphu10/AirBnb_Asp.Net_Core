using AirBnb.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.SeedWorks
{
    public interface IUnitOfWork
    {
        ICommentRepository Comments { get; }
        IBookRoomRepository BookRooms { get; }
        IRoomRepository Rooms { get; }
        ILocationRepository Locations { get; }
        ISeriesRepository Series { get; }
        ITagRepository Tags { get; }
        IRoomCategoryRepository RoomCategories { get; }
        IUserRepository Users { get; }
        ITransactionRepository Transactions { get; }
        Task<int> CompleteAsync();

    }
}
