using AirBnb.Core.Shared.Configurations;
using Hangfire;
using System.Security.Authentication;
using System.Xml.Xsl;

namespace AirBnb.Api.Extensions
{
    public static class HangfireExtensions
    {
        public static IServiceCollection AddHangfireService(this IServiceCollection services)
        {
            var settings = services.GetOptions<HangFireSettings>("HangFireSettings");
            if (settings == null || settings.Storage == null ||
                string.IsNullOrEmpty(settings.Storage.ConnectionString))
                throw new Exception("HangFireSettings is not configured properly!");

            services.ConfigureHangfireServices(settings);
            services.AddHangfireServer(serverOptions
                =>
            { serverOptions.ServerName = settings.ServerName; });

            return services;
        }

        private static IServiceCollection ConfigureHangfireServices(this IServiceCollection services,
            HangFireSettings settings)
        {
            if (string.IsNullOrEmpty(settings.Storage.DBProvider))
                throw new Exception("HangFire DBProvider is not configured.");

            switch (settings.Storage.DBProvider.ToLower())
            {

                case "mssql":
                    services.AddHangfire(config => config.UseSqlServerStorage(settings.Storage.ConnectionString));
                    break;

                default:
                    throw new Exception($"HangFire Storage Provider {settings.Storage.DBProvider} is not supported.");
            }

            return services;
        }
    }
}
