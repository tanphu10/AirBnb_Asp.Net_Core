using AirBnb.Api.Extensions;
using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/user/comment")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CommentsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> CreateCommentAsync([FromBody] CreateUpdateCommentRequest model)
        {
            var data = _mapper.Map<CreateUpdateCommentRequest, Comments>(model);
            data.UserId = User.GetUserId();
            data.DateCreated = DateTime.Now;

            _unitOfWork.Comments.Add(data);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCommentAsync(Guid id, [FromBody] CreateUpdateCommentRequest model)
        {
            var checkId = await _unitOfWork.Comments.GetByIdAsync(id);
            if (checkId == null) return NotFound("không chứ comments");
            _mapper.Map(model, checkId);
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
        [HttpGet("all")]
        public async Task<ActionResult<List<CommentDto>>> GetAllCommentsAsync()
        {
            var data = await _unitOfWork.Comments.GetAllAsync();
            return Ok(data);
        }
        [HttpGet("room/{roomid}")]
        public async Task<ActionResult<List<CommentDto>>>
            GetCommentRoomAsync(Guid roomid)
        {
            var data = await _unitOfWork.Comments.GetCommentsRoom(roomid);
            return Ok(data);
        }
        [HttpGet("paging")]
        public async Task<ActionResult<PagedResult<CommentDto>>> GetPagingCommentAsync(string? keyword, int pageIndex = 1, int pageSize = 10)
        {
            var data = await _unitOfWork.Comments.GetAllPaging(keyword, pageIndex, pageSize);
            return Ok(data);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync([FromBody] Guid[] ids)
        {
            foreach (var id in ids)
            {
                var comment = await _unitOfWork.Comments.GetByIdAsync(id);
                if (comment == null) return NotFound();
                _unitOfWork.Comments.Remove(comment);
            }
            var result = await _unitOfWork.CompleteAsync();
            return result > 0 ? Ok() : BadRequest();
        }
    }
}
