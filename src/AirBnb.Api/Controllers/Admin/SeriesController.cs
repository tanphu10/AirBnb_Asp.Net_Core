using AirBnb.Api.Extensions;
using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AutoMapper;
using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/series")]
    [ApiController]
    public class SeriesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public SeriesController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }
        [HttpPost]
        public async Task<IActionResult> CreateSeries([FromBody] CreateUpdateSeriesRequest model)
        {
            if (await _unitOfWork.Series.IsSlugAlreadyExisted(model.Slug))
            {
                return BadRequest("đã tồn tại slug");
            }
            var series = _mapper.Map<CreateUpdateSeriesRequest, Series>(model);
            var userId = User.GetUserId();
            series.AuthorUserId = userId;
            series.DateCreated = DateTime.Now;
            _unitOfWork.Series.Add(series);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpGet]
        public async Task<ActionResult<SeriesInListDto>> GetAllSeriesAsync()
        {
            var data = await _unitOfWork.Series.GetAllAsync();
            return Ok(data);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<SeriesDto>> GetByIdAsync(Guid id
            )
        {
            var data = await _unitOfWork.Series.GetByIdAsync(id);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSeries(Guid id,
            [FromBody] CreateUpdateSeriesRequest model)
        {
            var checkSeries = await _unitOfWork.Series.GetByIdAsync(id);
            if (checkSeries == null) return NotFound();
            _mapper.Map(model, checkSeries);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();

        }
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync([FromQuery] Guid[] ids)
        {
            foreach (var id in ids)
            {
                var data = await _unitOfWork.Series.GetByIdAsync(id);
                if (data == null) return NotFound();
                _unitOfWork.Series.Remove(data);
            }
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }

        [HttpGet("paging")]
        //[Route("paging")]
        public async Task<ActionResult<PagedResult<SeriesInListDto>>> GetSeriesPaging(string? keyword,
            int pageIndex = 1, int pageSize = 10)
        {
            var result = await _unitOfWork.Series.GetAllPagingSeries(keyword, pageIndex, pageSize);
            return Ok(result);
        }
        [HttpPost("room-series")]
        public async Task<IActionResult> AddRoomSeries([FromBody] AddRoomSeriesRequest model)
        {
            var isExisted = await _unitOfWork.Series.IsRoomInSeries(model.SeriesId, model.RoomId);
            if (isExisted)
            {
                return BadRequest("đã tồn tại trong series");
            }
            await _unitOfWork.Series.AddRoomSeries(model.RoomId, model.SeriesId, model.DisplayOrder);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpGet("room-series/{roomid}")]
        public async Task<ActionResult<List<RoomInListDto>>> GetRoomInSeries(Guid roomid)
        {
            var room = await _unitOfWork.Series.GetAllRoomSeries(roomid);
            return Ok(room);
        }

    }
}
