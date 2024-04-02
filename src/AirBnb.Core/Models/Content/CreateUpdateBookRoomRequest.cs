using AirBnb.Core.Domain.Content;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Content
{
    public class CreateUpdateBookRoomRequest
    {
        public Guid RoomId { get; set; }
        public DateTime DateCheckIn { get; set; }
        public DateTime DateCheckout { get; set; }
        public int GuestNumber { get; set; }
        public  string  Note { get; set; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<CreateUpdateBookRoomRequest, BookRooms>();
            }
        }

    }
}
