using AirBnb.Core.Domain.Content;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Content
{
    public class TypeInListDto
    {
        public Guid Id { get; set; }
        public string TypeName { get; set; }
        public string Image { get; set; }
        public string Slug { get; set; }
        public bool IsActive { set; get; }
        public class AutoMapperProfiles : Profile
        {
            
            public AutoMapperProfiles()
            {
                CreateMap<TypeRoom, TypeInListDto>();
            }
        }
    }
}
