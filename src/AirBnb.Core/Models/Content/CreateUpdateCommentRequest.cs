using AirBnb.Core.Domain.Content;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Content
{
    public class CreateUpdateCommentRequest
    {
        public Guid RoomId { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<CreateUpdateCommentRequest, Comments>();
            }
        }

    }
}
