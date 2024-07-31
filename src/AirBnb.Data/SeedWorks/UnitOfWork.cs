using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Repositories;
using AirBnb.Core.SeedWorks;
using AirBnb.Data.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Data.SeedWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AirBnbContext _context;
        //private readonly UserManager<AppUser> _userManager;
        public UnitOfWork(AirBnbContext context, IMapper mapper, UserManager<AppUser> userManager)
        {
            _context = context;
            Rooms = new RoomRepository(context, mapper, userManager);
            RoomCategories = new RoomCategoryRepository(context, mapper);
            Users = new UserRepository(context, mapper);
            Series = new SeriesRepository(context, mapper);
            Locations = new LocationRepository(context, mapper);
            BookRooms = new BookRoomRepository(context, mapper, userManager);
            Comments = new CommentRepository(context, mapper);
            Tags = new TagRepositiory(context, mapper);
            Transactions = new TransactionRepository(context, mapper);
            TypeRooms = new TypeRepository(context, mapper, userManager);
            LikeRooms = new LikeRepository(context, mapper, userManager);
        }
        public ICommentRepository Comments { get; private set; }
        public IRoomRepository Rooms { get; private set; }
        public IRoomCategoryRepository RoomCategories { get; private set; }
        public IUserRepository Users { get; private set; }
        public ILocationRepository Locations { get; set; }
        public ISeriesRepository Series { get; private set; }
        public IBookRoomRepository BookRooms { get; private set; }
        public ITagRepository Tags { get; private set; }
        public ITransactionRepository Transactions { get; private set; }
        public ITypeRepository TypeRooms { get; private set; }
        public ILikeRepository LikeRooms { get; private set; }



        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
