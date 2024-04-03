using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Content
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<Comments, CommentDto>();
            }
        }
    }
}
