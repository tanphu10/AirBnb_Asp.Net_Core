using AirBnb.Api.Authorization;
using AirBnb.Api.Services;
using AirBnb.Core.ConfigOptions;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AirBnb.Core.Shared.Contracts;
using AirBnb.Core.Shared.Services;
using AirBnb.Data;
using AirBnb.Data.SeedWorks;
using AirBnb.Data.Shared.Contracts;
using AirBnb.Data.Shared.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AirBnb.Api.Extensions
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AirBnbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), builder => builder.MigrationsAssembly(typeof(AirBnbContext).Assembly.FullName));
            });
            services.AddScoped<DataSeeder>();
            services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();
            services.AddScoped<IAuthorizationHandler, PermissionAuthorizationHandler>();
            services.AddScoped(typeof(IRepository<,>), typeof(RepositoryBase<,>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddAutoMapper(typeof(RoomInListDto));
            services.Configure<JwtTokenSettings>(configuration.GetSection("JwtTokenSettings"));
            services.Configure<MediaSettings>(configuration.GetSection("MediaSettings"));
            services.AddScoped<SignInManager<AppUser>, SignInManager<AppUser>>();
            services.AddScoped<UserManager<AppUser>, UserManager<AppUser>>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IRoomService, RoomService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IPayRoomService, PayRoomService>();
            services.AddScoped<RoleManager<AppRole>, RoleManager<AppRole>>();
            //services.AddScoped<ISmtpEmailService, SmtpEmailService>();
            services.AddIdentity<AppUser, AppRole>(options => options.SignIn.RequireConfirmedAccount = false).AddEntityFrameworkStores<AirBnbContext>();
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;
                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = false;

                // User settings.
                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = false;
            });
            //services.AddTransient<IScheduleJobService, ScheduleJobService>();
            //services.AddTransient<IBackgroundJobService, BackgroundJobService>();
            return services;
        }
       
    }
}
