using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks.Constansts;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/role")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IMapper _mapper;
        public RolesController(RoleManager<AppRole> roleManager, IMapper mapper)
        {
            _roleManager = roleManager;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult> CreateRole([FromBody] CreateUpdateRoleRequest model)
        {
            await _roleManager.CreateAsync(new AppRole()
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                DisplayName = model.DisplayName,
            });
            return new OkResult();
        }
        [HttpPut]
        [Authorize(Permissions.Roles.Edit)]

        public async Task<ActionResult> UpdateRole(Guid id, [FromBody] CreateUpdateRoleRequest model)
        {
            var role = await _roleManager.FindByIdAsync(id.ToString());
            if (role == null)
            {
                return NotFound();
            }
            role.Name = model.Name;
            role.DisplayName = model.DisplayName;
            await _roleManager.UpdateAsync(role);
            return Ok();
        }
        [HttpDelete]
        [Authorize(Permissions.Roles.Delete)]

        public async Task<ActionResult> DeleteRole([FromBody] Guid[] ids)
        {
            foreach (var id in ids)
            {
                var role = await _roleManager.FindByIdAsync(id.ToString());
                if (role == null)

                    return NotFound();

                await _roleManager.DeleteAsync(role);

            }
            return Ok();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoleId(Guid id)
        {
            var role = await _roleManager.FindByIdAsync(id.ToString());
            if (role == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<AppRole, RoleDto>(role));
        }
        [HttpGet]
        [Route("All")]
        [Authorize(Permissions.Roles.View)]

        public async Task<ActionResult<List<RoleDto>>> GetAllRoleAsync()
        {
            var data = await _mapper.ProjectTo<RoleDto>(_roleManager.Roles).ToListAsync();
            return Ok(data);
        }
        [HttpGet]
        [Route("Paging")]
        public async Task<ActionResult<PagedResult<RoleDto>>> GetAllPaging(string? keyword, int pageIndex, int pageSize)
        {

            var query = _roleManager.Roles;
            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(x => x.Name.Contains(keyword) || x.DisplayName.Contains(keyword));
            var totalRow = query.Count();
            var data = await _mapper.ProjectTo<RoleDto>(query).ToListAsync();
            var paginationSet = new PagedResult<RoleDto>
            {
                Results = data,
                CurrentPage = pageIndex,
                PageSize = pageSize,
                RowCount = totalRow
            };
            return Ok(paginationSet);
        }
    }
}
