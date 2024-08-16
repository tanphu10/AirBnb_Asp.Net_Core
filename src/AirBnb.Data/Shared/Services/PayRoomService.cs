using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.SeedWorks;
using AirBnb.Core.Shared.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace AirBnb.Data.Shared.Services
{
    public class PayRoomService : IPayRoomService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        public PayRoomService(UserManager<AppUser> userManager, IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager; _configuration = configuration;
        }

        public async Task PayCashForOwnerAsync(Guid fromUserId, Guid toOwnerId, Guid bookId)
        {
            var fromUser = await _userManager.FindByIdAsync(fromUserId.ToString());
            if (fromUser == null)
            {
                throw new Exception($"User {fromUserId} not found");
            }

            var toOwner = await _userManager.FindByIdAsync(toOwnerId.ToString());
            if (toOwner == null)
            {
                throw new Exception($"User {toOwner} not found");
            }
            var checkPaidBookRooms = await _unitOfWork.BookRooms.GetUserBookedd(fromUserId, bookId);
            if (fromUser.Balance < checkPaidBookRooms.PayRoomAmount)
            {
                throw new Exception($"User {fromUserId} nộp tiền để có thể thanh toán");
            }
            double totalCash = 0;
            checkPaidBookRooms.IsPaid = true;
            checkPaidBookRooms.PaidDate = DateTime.Now;
            totalCash += checkPaidBookRooms.PayRoomAmount;
            toOwner.Balance += totalCash;
            await _userManager.UpdateAsync(toOwner);
            fromUser.Balance -= totalCash;
            await _userManager.UpdateAsync(fromUser);
            _unitOfWork.Transactions.Add(new Transaction()
            {
                FromUserId = fromUser.Id,
                FromUserName = fromUser.UserName,
                ToOwnerId = toOwnerId,
                ToOwnerName = toOwner.UserName,
                Amount = totalCash,
                TransactionType = TransactionType.RoomPay,
                Note = $"{fromUser.UserName} thanh toán tiền phòng cho {toOwner.UserName}"
            });
            await _unitOfWork.CompleteAsync();
        }
    }
}
