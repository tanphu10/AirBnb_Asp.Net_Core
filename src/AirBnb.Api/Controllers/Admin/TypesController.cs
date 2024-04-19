using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Models;
using AirBnb.Core.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/type-room")]
    [ApiController]
    public class TypesController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public TypesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTypeRoomAsync([FromBody] CreateUpdateTypeRoomRequest model)
        {

            if (await _unitOfWork.TypeRooms.IsSlugAlreadyExisted(model.Slug))
            {
                return BadRequest("đã tồn tại slug");
            }
            var typeR = _mapper.Map<CreateUpdateTypeRoomRequest, TypeRoom>(model);
            _unitOfWork.TypeRooms.Add(typeR);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpGet]
        [Route("all-type")]
        public async Task<ActionResult<List<TypeRoom>>> GetAllTypeRoomAsync()
        {
            var data = await _unitOfWork.TypeRooms.GetAllAsync();
            return Ok(data);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeRoom>> GetTypeRoomByIdAsync(Guid id)
        {
            var data = await _unitOfWork.TypeRooms.GetByIdAsync(id);
            return Ok(data);
        }
        [HttpGet("Paging")]
        public async Task<ActionResult<PagedResult<TypeInListDto>>> GetTypeRoomPagingAsync(string? keyword, int pageIndex = 1, int pageSize = 10)
        {
            var data = await _unitOfWork.TypeRooms.GetAllPaging(keyword, pageIndex, pageSize);
            return Ok(data);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateTypeRoomAsync(Guid id, [FromBody] CreateUpdateTypeRoomRequest model)
        {
            var location = await _unitOfWork.TypeRooms.GetByIdAsync(id);
            if (location == null) return NotFound();
            _mapper.Map(model, location);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteTypeRoomAsync([FromBody] Guid[] ids)
        {
            foreach (var id in ids)
            {
                var location = await _unitOfWork.TypeRooms.GetByIdAsync(id);
                if (location == null) return NotFound();
                _unitOfWork.TypeRooms.Remove(location);

            }
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpPost("room-types")]
        public async Task<IActionResult> AddRoomToTypes([FromBody] AddRoomToTypeRequest model)
        {
            var isExisted = await _unitOfWork.TypeRooms.IsRoomInTypes(model.TypeId, model.RoomId);
            if (isExisted)
            {
                return BadRequest("đã tồn tại trong typerooms");
            }
            await _unitOfWork.TypeRooms.AddRoomTypes(model.RoomId, model.TypeId, model.DisplayOrder);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpDelete()]
        [Route("room-from-types")]
        //[Authorize(Permissions.Series.Edit)]
        public async Task<IActionResult> DeleteRoomsFromTypes([FromBody] AddRoomToTypeRequest request)
        {
            var isExisted = await _unitOfWork.TypeRooms.IsRoomInTypes(request.TypeId, request.RoomId);
            if (!isExisted)
            {
                return NotFound();
            }
            await _unitOfWork.TypeRooms.RemoveRoomFromTypes(request.TypeId, request.RoomId);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpGet("room-in-types/{typeid}")]
        public async Task<ActionResult<List<RoomInListDto>>> GetRoomInTypes(Guid typeid)
        {
            var room = await _unitOfWork.TypeRooms.GetAllRoomTypes(typeid);
            return Ok(room);
        }
    }
}
