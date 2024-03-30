using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Domain.Content
{
    [Table("RoomTags")]
    [PrimaryKey(nameof(RoomId), nameof(TagId))]
    public class RoomTag
    {
        public Guid RoomId { set; get; }
        public Guid TagId { set; get; }
    }
}
