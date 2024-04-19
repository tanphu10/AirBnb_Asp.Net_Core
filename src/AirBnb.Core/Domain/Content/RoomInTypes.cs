using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Domain.Content
{
    [Table("RoomInTypes")]
    [PrimaryKey(nameof(RoomId), nameof(TypeId))]
    public class RoomInTypes
    {
        public Guid RoomId { get; set; }
        public Guid TypeId { get; set; }
        public int DisplayOrder { get; set; }
    }
}
