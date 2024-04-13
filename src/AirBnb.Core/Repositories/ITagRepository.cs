using AirBnb.Core.Domain.Content;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Repositories
{
    public interface ITagRepository:IRepository<Tag,Guid>
    {
        Task<List<string>> GetAllTags();
        Task<TagDto?> GetBySlug(string slug);
    }
}
