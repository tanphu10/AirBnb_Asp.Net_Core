using AirBnb.Core.Domain.Content;
using AutoMapper;
using static AirBnb.Core.Domain.Content.BookRooms;

namespace AirBnb.Core.Models.Content
{
    public class BookRoomInListDto
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public string RoomName { get; set; }
        public Guid AuthorUserId { get; set; }
        public DateTime DateCheckIn { get; set; }
        public DateTime DateCheckout { get; set; }
        public int GuestNumber { get; set; }
        public BookRoomStatus Status { get; set; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<BookRooms, BookRoomInListDto>();
            }
        }
    }
}
