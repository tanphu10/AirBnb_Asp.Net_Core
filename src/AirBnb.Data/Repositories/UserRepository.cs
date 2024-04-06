using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Repositories;
using AirBnb.Data.SeedWorks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static AirBnb.Core.SeedWorks.Constansts.Permissions;

namespace AirBnb.Data.Repositories
{
    public class UserRepository : RepositoryBase<AppUser, Guid>, IUserRepository
    {

        private readonly IMapper _mapper;
        public UserRepository(AirBnbContext context ,IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }
        public async Task RemoveUserFromRoles(Guid userId, string[] roleNames)
        {
            if (roleNames == null || roleNames.Length == 0)
            {
                return;
            }
            foreach (var roleName in roleNames)
            {
                var role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == roleName);
                if (role == null)
                {
                    return;
                }
                var userRole = await _context.UserRoles.FirstOrDefaultAsync(x => x.RoleId == role.Id && x.UserId == userId);
                if (userRole == null) { return; }
                _context.UserRoles.Remove(userRole);
            }

        }

       

    }
}
