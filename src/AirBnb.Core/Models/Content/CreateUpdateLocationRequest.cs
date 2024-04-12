using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AirBnb.Core.Domain.Content;
using AutoMapper;

namespace AirBnb.Core.Models.Content
{
    public class CreateUpdateLocationRequest
    {
        public required string Name { get; set; }
        public string District { get; set; }
        public bool IsACtive { get; set; }
        public string Province { get; set; }
        public string Slug { get; set; }
        public string Nation { get; set; }
        public string? Thumbnail { set; get; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<CreateUpdateLocationRequest, Location>();
            }
        }
    }
}
