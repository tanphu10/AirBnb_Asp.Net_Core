﻿using AirBnb.Core.Domain.Content;
using AutoMapper;

namespace AirBnb.Core.Models.Content
{
    public class RoomInListDto
    {
        public Guid Id { get; set; }
        public required string RoomName { get; set; }
        public required string Slug { get; set; }
        public required int Guest { get; set; }
        public required string Description { get; set; }
        public int Price { get; set; }
        public string? Photo { get; set; }
        public DateTime DateCreated { get; set; }
        public int ViewCount { get; set; }

        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<Room, RoomInListDto>();
            }
        }
    }
}
