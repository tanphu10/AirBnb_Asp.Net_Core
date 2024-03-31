using AirBnb.Core.Repositories;
using AirBnb.Core.SeedWorks;
using AirBnb.Data.Repositories;
using AutoMapper;
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

        public UnitOfWork(AirBnbContext context, IMapper mapper)
        {
            _context = context;
            Rooms = new RoomRepository(context, mapper);
            RoomCategories = new RoomCategoryRepository(context, mapper);
        }
        public IRoomRepository Rooms { get; private set; }
        public IRoomCategoryRepository RoomCategories { get; private set; }

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
