using AirBnb.Core.Domain.Identity;
using AirBnb.Core.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Repositories
{
    public interface IUserRepository:IRepository<AppUser,Guid>
    {
        Task RemoveUserFromRoles(Guid userId, string[] roles);
    }
}
