using AirBnb.Core.Domain.Content;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static AirBnb.Core.Domain.Content.BookRooms;

namespace AirBnb.Core.Models.Content
{
    public class BookRoomsDto:BookRoomInListDto
    {
        public string Note { get; set; }
        public string AuthorUserName { get; set; }
        public string AuthorName { get; set; }

        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<BookRooms, BookRoomsDto>();
            }
        }
    }
}
