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
        public string Name { get; set; }
        public string province { get; set; }
        public string Slug { get; set; }
        public string Nation { get; set; }
        public string? Thumbnail { set; get; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<Location, LocationDto>();
            }
        }
    }
}
