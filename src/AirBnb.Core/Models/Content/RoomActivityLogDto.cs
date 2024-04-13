﻿using AirBnb.Core.Domain.Content;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Content
{
    public class RoomActivityLogDto
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }

        public RoomStatus FromStatus { set; get; }

        public RoomStatus ToStatus { set; get; }

        public DateTime DateCreated { get; set; }

        public string? Note { set; get; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<RoomActivityLogs, RoomActivityLogDto>();
            }
        }
        //thêm trường userName
    }
}
