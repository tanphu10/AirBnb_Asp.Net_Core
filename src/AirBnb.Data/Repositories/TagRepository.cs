using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models.Content;
using AirBnb.Core.Repositories;
using AirBnb.Data.SeedWorks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Data.Repositories
{
    public class TagRepositiory : RepositoryBase<Tag, Guid>, ITagRepository    {
        private readonly IMapper _mapper;
        public TagRepositiory(AirBnbContext context, IMapper mapper) : base
            (context)
        {
            _mapper = mapper;

        }

        public async Task<List<string>> GetAllTags()
        {
            var data = _context.Tags.Select(x => x.Name);
            return await data.ToListAsync();
        }

        public async Task<TagDto?> GetBySlug(string slug)
        {
            var data = await _context.Tags.FirstOrDefaultAsync(x => x.Slug == slug);
            if (data == null) return null;
            return _mapper.Map<TagDto>(data);

        }

    }
}
