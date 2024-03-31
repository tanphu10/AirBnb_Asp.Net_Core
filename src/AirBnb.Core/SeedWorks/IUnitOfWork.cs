﻿using AirBnb.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.SeedWorks
{
    public interface IUnitOfWork
    {
        IRoomRepository Rooms { get; }
        IRoomCategoryRepository RoomCategories { get; }
        Task<int> CompleteAsync();

    }
}
