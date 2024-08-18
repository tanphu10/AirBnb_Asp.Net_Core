using AirBnb.Api;
using AirBnb.Api.Extensions;
using AirBnb.Core.SeedWorks;
using AirBnb.Data.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;
using System.Text;
using Serilog;


Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

var builder = WebApplication.CreateBuilder(args);

Log.Information($"Start {builder.Environment.ApplicationName} up");
try
{
    var configuration = builder.Configuration;
    builder.Host.AddAppConfigurations();
    builder.Services.AddConfigurationSettings(builder.Configuration);
    builder.Services.AddInfrastructureServices(builder.Configuration);
    builder.Services.ConfigureServices();
    builder.Services.AddHangfireService();

    var TanPhuCorsPolicy = "TanPhuCorsPolicy";


    builder.Services.AddCors(o => o.AddPolicy(TanPhuCorsPolicy, builder =>
    {
        builder.AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins(configuration["AllowedOrigins"], "http://localhost:3000")
            .AllowCredentials();
    }));
  

    // Business services and repositories
    var services = typeof(RoomRepository).Assembly.GetTypes()
        .Where(x => x.GetInterfaces().Any(i => i.Name == typeof(IRepository<,>).Name)
        && !x.IsAbstract && x.IsClass && !x.IsGenericType);

    foreach (var service in services)
    {
        var allInterfaces = service.GetInterfaces();
        var directInterface = allInterfaces.Except(allInterfaces.SelectMany(t => t.GetInterfaces())).FirstOrDefault();
        if (directInterface != null)
        {
            builder.Services.Add(new ServiceDescriptor(directInterface, service, ServiceLifetime.Scoped));
        }
    }

    
    //Default config for ASP.NET Core
    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.CustomOperationIds(apiDesc =>
        {
            return apiDesc.TryGetMethodInfo(out MethodInfo methodInfo) ? methodInfo.Name : null;
        });
        c.SwaggerDoc("AdminAPI", new Microsoft.OpenApi.Models.OpenApiInfo
        {
            Version = "v1",
            Title = "API for Administrators",
            Description = "API for CMS core domain. This domain keeps track of campaigns, campaign rules, and campaign execution."
        });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "bearer"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
        });
        c.ParameterFilter<SwaggerNullableParameterFilter>();

    });
    builder.Services.AddAuthentication(o =>
    {
        o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(cfg =>
    {
        cfg.RequireHttpsMetadata = false;
        cfg.SaveToken = true;
        cfg.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = configuration["JwtTokenSettings:Issuer"],
            ValidAudience = configuration["JwtTokenSettings:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtTokenSettings:Key"]))
        };
    });

    var app = builder.Build();

    // Configure the HTTP request pipeline.

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger(c =>
        {
            c.PreSerializeFilters.Add((document, request) =>
            {
                var paths = document.Paths.ToDictionary(item => item.Key.ToLowerInvariant(), item => item.Value);
                document.Paths.Clear();
                foreach (var pathItem in paths)
                {
                    document.Paths.Add(pathItem.Key, pathItem.Value);
                }
            });
        });
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("AdminAPI/swagger.json", "Admin API");
            c.DisplayOperationId();
            c.DisplayRequestDuration();
        });
    }
    // phần này thêm hình
    app.UseStaticFiles();

    app.UseCors(TanPhuCorsPolicy);
    app.UseHttpsRedirection();

    app.UseAuthentication();

    app.UseHangfireDashboard(builder.Configuration);

    app.UseAuthorization();

    app.MapControllers();

    //app.MigrateDatabase();

    app.Run();
}
catch (Exception ex)
{
    string type = ex.GetType().Name;
    if (type.Equals("StopTheHostException", StringComparison.Ordinal)) throw;

    Log.Fatal(ex, $"Unhandled exception: {ex.Message}");
}
finally
{
    Log.Information($"Shutdown {builder.Environment.ApplicationName} complete");
    Log.CloseAndFlush();
}