using AirBnb.Core.Domain.Content;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Content
{
    public class LocationDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string District { get; set; }
        public string Province { get; set; }
        public string Slug { get; set; }
        public string Nation { get; set; }
        public string? Thumbnail { set; get; }
        public bool IsActive { set; get; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<Location, LocationDto>();
            }
        }
    }
}
