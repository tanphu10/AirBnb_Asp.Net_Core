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
        public string? RoomName { get; set; }
        public string? AuthorUserName { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public string? Content { get; set; }
        //public class AutoMapperProfiles : Profile
        //{
        //    public AutoMapperProfiles()
        //    {
        //        CreateMap<Comments, CommentDto>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
        //    .ForMember(dest => dest.RoomId, opt => opt.MapFrom(src => src.RoomId))
        //    .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
        //    .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => src.DateCreated))
        //    .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
        //    .ForMember(dest => dest.RoomName, opt => opt.Ignore()) // Chúng ta sẽ xử lý sau
        //    .ForMember(dest => dest.AuthorUserName, opt => opt.Ignore()); ;
        //    }
        //}
    }
}
