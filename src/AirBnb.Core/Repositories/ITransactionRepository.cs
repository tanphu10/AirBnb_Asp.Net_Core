using AirBnb.Core.Models;
using AirBnb.Core.Models.PayRoom;
using AirBnb.Core.SeedWorks;
using AirBnb.Core.Domain.Content;
namespace AirBnb.Core.Repositories
{
    public interface ITransactionRepository:IRepository<Transaction,Guid>
    {
        Task<PagedResult<TransactionDto>> GetAllPaging(string? userName,
        int fromMonth, int fromYear, int toMonth, int toYear, int pageIndex = 1, int pageSize = 10);
    }
}
