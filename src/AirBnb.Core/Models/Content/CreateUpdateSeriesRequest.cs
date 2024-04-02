using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AirBnb.Core.Domain.Content;

namespace AirBnb.Core.Models.Content
{
    public class CreateUpdateSeriesRequest
    {
        [MaxLength(250)]
        public required string Name { get; set; }

        public string? Description { get; set; }
        [MaxLength(250)]
        public required string Slug { get; set; }

        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
        [MaxLength(250)]
        public string? SeoDescription { get; set; }

        public string? Thumbnail { set; get; }

        public string? Content { get; set; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<CreateUpdateSeriesRequest, Series>();
            }
        }
    }
}
