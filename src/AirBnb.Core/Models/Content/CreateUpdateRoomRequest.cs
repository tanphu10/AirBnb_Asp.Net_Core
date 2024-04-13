using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AirBnb.Core.Domain.Content;

namespace AirBnb.Core.Models.Content
{
    public class CreateUpdateRoomRequest
    {
        public required string Name { get; set; }
        public required string Slug { get; set; }
        public required int Guest { get; set; }
        public required string Description { get; set; }
        public string? SeoDescription { get; set; }
        public Guid CategoryId { get; set; }
        public Guid LocateId { get; set; }
        public string[] Tags { get; set; }
        public int BedRoom { get; set; }
        public int BathRoom { get; set; }
        public int Price { get; set; }
        public bool WashMachine { get; set; }
        public bool IronCloth { get; set; }
        public bool Televison { get; set; }
        public bool AirCondirioner { get; set; }
        public bool Wifi { get; set; }
        public bool Kitchen { get; set; }
        public bool Pool { get; set; }
        public bool Park { get; set; }
        public string? Photo { get; set; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<CreateUpdateRoomRequest, Room>();
            }
        }

    }
}
