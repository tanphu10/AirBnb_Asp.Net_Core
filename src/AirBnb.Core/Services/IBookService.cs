﻿using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models.Content;

namespace AirBnb.Core.Services
{
    public interface IBookService
    {
        Task<BookRooms> MapRequestToBookRoomAsync(CreateUpdateBookRoomRequest model, Guid userId);

    }
}