using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace AirBnb.Data
{
    public class AirBnbContextFactory : IDesignTimeDbContextFactory<AirBnbContext>
    {
        public AirBnbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json")
               .Build();

            var builder = new DbContextOptionsBuilder<AirBnbContext>();
            builder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            return new AirBnbContext(builder.Options);
        }
    }
}
