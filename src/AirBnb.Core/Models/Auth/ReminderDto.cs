using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Auth
{
    public record ReminderDto(string email, string subject, string emailContent, DateTimeOffset enqueueAt);
}
