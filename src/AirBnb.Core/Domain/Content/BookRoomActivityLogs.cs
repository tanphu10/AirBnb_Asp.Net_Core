using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static AirBnb.Core.Domain.Content.BookRooms;

namespace AirBnb.Core.Domain.Content
{
    [Table("BookRoomActivityLogs")]
    public class BookRoomActivityLog
    {
        [Key]
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public BookRoomStatus FromStatus { set; get; }
        public BookRoomStatus ToStatus { set; get; }

        public DateTime DateCreated { get; set; }

        [MaxLength(500)]
        public string? Note { set; get; }

        public Guid UserId { get; set; }
        public string UserName { get; set; }
    }
}
