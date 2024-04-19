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
    public class CreateUpdateTypeRoomRequest
    {
        public string TypeName { get; set; }
        public string Image { get; set; }
        public string Slug { get; set; }
        public bool IsActive { set; get; }

        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<CreateUpdateTypeRoomRequest, TypeRoom>();
            }
        }

    }
}
