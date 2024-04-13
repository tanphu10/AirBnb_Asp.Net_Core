using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Services
{
    public interface IPayRoomService
    {
        Task PayCashForOwnerAsync(Guid fromUserId, Guid toUserId);
    }
}
