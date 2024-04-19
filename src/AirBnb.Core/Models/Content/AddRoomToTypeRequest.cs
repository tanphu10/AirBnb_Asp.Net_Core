using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Content
{
    public class AddRoomToTypeRequest
    {
        public Guid RoomId { get; set; }
        public Guid TypeId { get; set; }
        public int DisplayOrder { get; set; }


    }
}
