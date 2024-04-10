using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<IdentityUserClaim<Guid>>().ToTable("AppUserClaims").HasKey(x => x.Id);
            builder.Entity<IdentityRoleClaim<Guid>>().ToTable("AppRoleClaims").HasKey(x => x.Id);
            builder.Entity<IdentityUserLogin<Guid>>().ToTable("AppUserLogins").HasKey(x => x.UserId);
            builder.Entity<IdentityUserRole<Guid>>().ToTable("AppUserRoles").HasKey(x => new { x.RoleId, x.UserId });
            builder.Entity<IdentityUserToken<Guid>>().ToTable("AppUserTokens").HasKey(x => new { x.UserId });
        }
    }
}
