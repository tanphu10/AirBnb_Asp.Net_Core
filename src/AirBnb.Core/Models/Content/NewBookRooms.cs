using AirBnb.Core.Domain.Content;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static AirBnb.Core.Domain.Content.BookRooms;

namespace AirBnb.Core.Models.Content
{
    public class NewBookRooms
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public string RoomName { get; set; }
        public Guid AuthorUserId { get; set; }
        public string AuthorUserName { get; set; }
        public string AuthorName { get; set; }
        public DateTime DateCheckIn { get; set; }
        public DateTime DateCheckout { get; set; }
        public int GuestNumber { get; set; }
        [Required]
        [MaxLength(250)]
        public string Note { get; set; }
        public BookRoomStatus Status { get; set; }
        public bool IsPaid { get; set; }
        public int PayRoomAmount { get; set; }
        public DateTime? PaidDate { get; set; }

        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<BookRooms, NewBookRooms>();
            }
        }
    }
}
