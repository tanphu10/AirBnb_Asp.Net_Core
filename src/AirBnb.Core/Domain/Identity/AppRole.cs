using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Domain.Identity
{
    [Table("AppRoles")]
    public class AppRole : IdentityRole<Guid>
    {
        public required string DisplayName { get; set; }
    }
}
