using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.SeedWorks.Constansts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace AirBnb.Data
{
    public class AirBnbContext : IdentityDbContext<AppUser, AppRole, Guid>
    {
        public AirBnbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Room> Rooms { set; get; }
        public DbSet<RoomCategory> RoomCategories { set; get; }
        public DbSet<RoomTag> RoomTags { set; get; }
        public DbSet<Tag> Tags { set; get; }
        public DbSet<RoomActivityLogs> RoomActivityLogs { set; get; }
        public DbSet<Series> Series { set; get; }
        public DbSet<RoomInSeries> RoomInSeries { set; get; }
        public DbSet<BookRooms> BookRooms { set; get; }
        public DbSet<BookRoomActivityLog> BookRoomActivityLogs { set; get; }
        public DbSet<Comments> Comments { set; get; }
        public DbSet<Location> Locations { set; get; }
        public DbSet<Transaction> Transactions { set; get; }
        public DbSet<TypeRoom> TypeRooms { set; get; }
        public DbSet<LikeRoom> LikeRooms { set; get; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<IdentityUserClaim<Guid>>().ToTable("AppUserClaims").HasKey(x => x.Id);
            builder.Entity<IdentityRoleClaim<Guid>>().ToTable("AppRoleClaims").HasKey(x => x.Id);
            builder.Entity<IdentityUserLogin<Guid>>().ToTable("AppUserLogins").HasKey(x => x.UserId);
            builder.Entity<IdentityUserRole<Guid>>().ToTable("AppUserRoles").HasKey(x => new { x.RoleId, x.UserId });
            builder.Entity<IdentityUserToken<Guid>>().ToTable("AppUserTokens").HasKey(x => new { x.UserId });
            builder.Entity<LikeRoom>().HasKey(lr => new { lr.UserId, lr.RoomId });

        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker
               .Entries()
               .Where(e => e.State == EntityState.Added);

            foreach (var entityEntry in entries)
            {
                var dateCreatedProp = entityEntry.Entity.GetType().GetProperty(SystemConsts.DateCreatedField);
                if (entityEntry.State == EntityState.Added
                    && dateCreatedProp != null)
                {
                    dateCreatedProp.SetValue(entityEntry.Entity, DateTime.Now);
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
