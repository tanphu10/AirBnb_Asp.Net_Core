using AirBnb.Core.Domain.Content;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Content
{
    public class LikeInListDto
    {
        public Guid UserId { get; set; }
        public Guid RoomId { get; set; }
        public DateTime DateCreated { get; set; }
        public bool Like { get; set; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<LikeRoom, LikeInListDto>();
            }
        }
    }
}
