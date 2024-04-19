using AirBnb.Api.Extensions;
using AirBnb.Api.Services;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models.Auth;
using AirBnb.Core.Models.System;
using AirBnb.Core.SeedWorks.Constansts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Text.Json;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly RoleManager<AppRole> _roleManager;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, RoleManager<AppRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _roleManager = roleManager;
        }
        [HttpPost]
        public async Task<ActionResult<AuthenticatedResult>> Login([FromBody] LoginRequest request)
        {
            //Authentication
            if (request == null)
            {
                return BadRequest("Invalid request");
            }
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null || user.IsActive == false || user.LockoutEnabled)
            {
                return Unauthorized();
            }
            //var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, false, true);
            var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, true);
            if (!result.Succeeded)
            {
                return Unauthorized();
            }
            //Authorization
            var roles = await _userManager.GetRolesAsync(user);
            var permission = await this.GetPermissionByUserIdAsync(user.Id.ToString());

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email,user.Email),
                new Claim(UserClaims.Id,user.Id.ToString()),
                new Claim(ClaimTypes.NameIdentifier,user.UserName),
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(UserClaims.UserName,user.UserName),
                new Claim(UserClaims.FirstName,user.FirstName),
                new Claim(UserClaims.Roles,string.Join(";",roles)),
                new Claim(UserClaims.Avatar,user.Avatar),
                new Claim(UserClaims.Permissions,JsonSerializer.Serialize(permission)),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTOkenExpiryTime = DateTime.Now.AddDays(30);
            await _userManager.UpdateAsync(user);
            return Ok(new AuthenticatedResult()
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                //User = user,
            });
        }

        private async Task<List<string>> GetPermissionByUserIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var roles = await _userManager.GetRolesAsync(user);
            var permissions = new List<string>();
            //là  tạo ra các type value display của RoleCliamsDto
            var allPermissions = new List<RoleClaimsDto>();
            if (roles.Contains(Roles.Admin))
            {
                var types = typeof(Permissions).GetTypeInfo().DeclaredNestedTypes;
                foreach (var item in types)
                {
                    allPermissions.GetPermissions(item);
                }
                permissions.AddRange(allPermissions.Select(x => x.Value));
            }
            else
            {
                foreach (var roleName in roles)
                {
                    var role = await _roleManager.FindByNameAsync(roleName);
                    var claims = await _roleManager.GetClaimsAsync(role);
                    var roleClaimValues = claims.Select(x => x.Value).ToList();
                    permissions.AddRange(roleClaimValues);
                }
            }
            return permissions.Distinct().ToList();
        }
    }
}
