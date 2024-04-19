using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Domain.Content
{
    [Table("Likes")]
    public class LikeRoom
    {
        public Guid UserId { get; set; }
        public Guid RoomId { get; set; }
        public DateTime DateCreated { get; set; }
        public bool Like { get; set; }
    }
}
