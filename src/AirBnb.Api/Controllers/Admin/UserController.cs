using AirBnb.Api.Extensions;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Models.System;
using AirBnb.Core.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public UserController(UserManager<AppUser> userManager, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        [HttpPost]

        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest model)
        {
            var checkUser = await _userManager.FindByEmailAsync(model.Email);
            if (checkUser != null)
            {
                return BadRequest();
            }
            var user = _mapper.Map<CreateUserRequest, AppUser>(model);
            user.DateCreated = DateTime.Now;
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(string.Join("<br>", result.Errors.Select(x => x.Description)));
        }
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<UserDto>> GetAllUser()
        {
            var data = await _mapper.ProjectTo<UserDto>(_userManager.Users).ToListAsync();
            return Ok(data);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserByIdAsync(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return NotFound();
            var roles = await _userManager.GetRolesAsync(user);
            var data = _mapper.Map<AppUser, UserDto>(user);
            data.Roles = roles;
            return Ok(data);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserRequest model)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return NotFound();
            }
            var data = _mapper.Map(model, user);
            var result = await _userManager.UpdateAsync(data);
            return Ok();
        }
        [HttpGet("Paging")]
        public async Task<ActionResult<PagedResult<UserDto>>> GetAllUserPaging(string? keyword, int pageIndex, int pageSize)
        {
            var query = _userManager.Users;
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.UserName.Contains(keyword) || x.FirstName.Contains(keyword));
            }
            var totalRow = query.Count();
            var data = await _mapper.ProjectTo<UserDto>(query).ToListAsync();
            var paginationSet = new PagedResult<UserDto>
            {
                Results = data,
                CurrentPage = pageIndex,
                PageSize = pageSize,
                RowCount = totalRow
            };
            return Ok(paginationSet);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteUser([FromBody] string[] ids)
        {
            foreach (var id in ids)
            {
                var user = await _userManager.FindByIdAsync(id.ToString());
                if (user == null)
                    return NotFound();
                await _userManager.DeleteAsync(user);

            }
            return Ok();
        }
        [HttpPut("password-change-current-user")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest model)
        {
            var user = await _userManager.FindByIdAsync(User.GetUserId().ToString());
            if (user == null)
            {
                return NotFound();
            }
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(string.Join("<br>", result.Errors.Select(x => x.Description)));
        }
        [HttpPost("set-password/{id}")]
        public async Task<IActionResult> SetPassword(Guid id, [FromBody] SetPasswordRequest request)
        {

            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null) return NotFound();

            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, request.NewPassword);
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(string.Join("<br>", result.Errors.Select(x => x.Description)));
        }
        [HttpPost("change-email/{id}")]
        public async Task<IActionResult> ChangeEmail(Guid id, [FromBody] ChangeEmailRequest request)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null) return NotFound();
            var token = await _userManager.GenerateChangeEmailTokenAsync(user, request.Email);
            var result = await _userManager.ChangeEmailAsync(user, request.Email, token);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(string.Join("<br>", result.Errors.Select(x => x.Description)));
        }
        [HttpPut("{id}/assign-users")]
        public async Task<IActionResult> AssignRoleToUser(string id,[FromBody] string[] roles)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();
            var currentRoles = await _userManager.GetRolesAsync(user);
            await _unitOfWork.Users.RemoveUserFromRoles(user.Id, currentRoles.ToArray());
            var addResult = await _userManager.AddToRolesAsync(user, roles);
            if (!addResult.Succeeded)
            {
                List<IdentityError> addedErrorList = addResult.Errors.ToList();
                var errorList = new List<IdentityError>();
                errorList.AddRange(addedErrorList);
                return BadRequest(string.Join("<br>", errorList.Select(x => x.Description)));
            }
            return Ok();
        }
    }
}
