using AirBnb.Core.Domain.Content;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Content
{
    public class CommentInListDto
    {

        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public string? RoomName { get; set; }
        public string? AuthorUserName { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public string? Content { get; set; }

        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<CommentInListDto, CommentInListDto>();
            }
        }
    }
}
