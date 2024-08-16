using AirBnb.Api.Extensions;
using AirBnb.Core.Models.PayRoom;
using AirBnb.Core.Models;
using AirBnb.Core.SeedWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AirBnb.Core.Shared.Services;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/admin/pay-room")]
    [ApiController]
    public class PayRoomController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPayRoomService _payRoomService;
        public PayRoomController(IUnitOfWork unitOfWork, IPayRoomService payRoomService)
        {
            _unitOfWork = unitOfWork;
            _payRoomService = payRoomService;
        }
        [HttpGet]
        [Route("transaction-histories")]
        //[Authorize(Royalty.View)]
        public async Task<ActionResult<PagedResult<TransactionDto>>> GetTransactionHistory(string? keyword,
         int fromMonth, int fromYear, int toMonth, int toYear,
           int pageIndex, int pageSize = 10)
        {
            var result = await _unitOfWork.Transactions.GetAllPaging(keyword, fromMonth, fromYear, toMonth, toYear, pageIndex, pageSize);
            return Ok(result);
        }
        [HttpPost]
        [Route("{ownerid}/{bookid}")]
        //[Authorize(Royalty.Pay)]
        public async Task<IActionResult> PayRoom(Guid ownerid, Guid bookid)
        {
            var fromUserId = User.GetUserId();
            await _payRoomService.PayCashForOwnerAsync(fromUserId, ownerid, bookid);
            await _unitOfWork.CompleteAsync();
            return Ok();
        }

    }
}
