﻿using AirBnb.Core.Models.PayRoom;
using AirBnb.Core.Models;
using AirBnb.Core.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using AirBnb.Core.Domain.Content;
using AirBnb.Data.SeedWorks;

namespace AirBnb.Data.Repositories
{
    public class TransactionRepository : RepositoryBase<Transaction, Guid>,ITransactionRepository
    {
        private readonly IMapper _mapper;

        public TransactionRepository(AirBnbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }
        public async Task<PagedResult<TransactionDto>> GetAllPaging(string? userName, int fromMonth, int fromYear, int toMonth, int toYear, int pageIndex = 1, int pageSize = 10)
        {
            var query = _context.Transactions.AsQueryable();
            if (!string.IsNullOrWhiteSpace(userName))
            {
                query = query.Where(x => x.ToOwnerName.Contains(userName));
            }
            if (fromMonth > 0 && fromYear > 0)
            {
                query = query.Where(x => x.DateCreated.Date.Month >= fromMonth && x.DateCreated.Year >= fromYear);
            }
            if (toMonth > 0 && toYear > 0)
            {
                query = query.Where(x => x.DateCreated.Date.Month <= toMonth && x.DateCreated.Year <= toYear);
            }
            var totalRow = await query.CountAsync();

            query = query.OrderByDescending(x => x.DateCreated)
               .Skip((pageIndex - 1) * pageSize)
               .Take(pageSize);

            return new PagedResult<TransactionDto>
            {
                Results = await _mapper.ProjectTo<TransactionDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize
            };

        }

    }
}
