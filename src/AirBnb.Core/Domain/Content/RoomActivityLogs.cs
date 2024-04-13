using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Domain.Content
{
    [Table("RoomActivityLogs")]
    public class RoomActivityLogs
    {
        [Key]
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }

        public RoomStatus FromStatus { set; get; }

        public RoomStatus ToStatus { set; get; }

        public DateTime DateCreated { get; set; }

        [MaxLength(500)]
        public string? Note { set; get; }

        public Guid UserId { get; set; }

    }
}
