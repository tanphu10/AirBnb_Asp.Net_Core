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
    public class RoomDto : RoomInListDto
    {
        public Guid CategoryId { get; set; }
        public Guid LocateId { get; set; }
        public Guid? TypeId { get; set; }
        public string? Tags { get; set; }
        public int BedRoom { get; set; }
        public int BathRoom { get; set; }
        public bool WashMachine { get; set; }
        public bool IronCloth { get; set; }
        public bool Televison { get; set; }
        public bool AirCondirioner { get; set; }
        public string? SeoDescription { get; set; }
        public bool Wifi { get; set; }
        public bool Kitchen { get; set; }
        public bool Pool { get; set; }
        public bool Park { get; set; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<Room, RoomDto>();
            }
        }
    }
}
