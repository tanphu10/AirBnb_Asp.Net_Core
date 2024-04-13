using AirBnb.Core.Domain.Content;
using AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace AirBnb.Core.Models.Content
{
    public class SeriesDto : SeriesInListDto
    {
        public Guid Id { get; set; }

        [MaxLength(250)]
        public string? SeoDescription { get; set; }

        [MaxLength(250)]
        public string? Thumbnail { set; get; }

        public string? Content { get; set; }

        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<Series, SeriesDto>();
            }
        }
    }
}
