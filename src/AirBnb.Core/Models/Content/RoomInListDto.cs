using AirBnb.Core.Domain.Content;
using AutoMapper;

namespace AirBnb.Core.Models.Content
{
    public class RoomInListDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Slug { get; set; }
        public required int Guest { get; set; }
        public required string Description { get; set; }
        public int Price { get; set; }
        public string? Photo { get; set; }
        public DateTime DateCreated { get; set; }
        public int ViewCount { get; set; }
        public required string CategorySlug { get; set; }
        public required string CategoryName { get; set; }
        public string AuthorUserName { get; set; }
        public string AuthorName { get; set; }
        public Guid CategoryId { get; set; }

        public RoomStatus Status { get; set; }
        //public bool IsPaid { get; set; }
        //public DateTime? PaidDate { get; set; }

        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<Room, RoomInListDto>();
            }
        }
    }
}
