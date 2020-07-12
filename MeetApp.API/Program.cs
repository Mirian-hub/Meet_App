using System;
using MeetApp.API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MeetApp.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var webHost = CreateHostBuilder(args).Build();
            using(var scope = webHost.Services.CreateScope()) 
            {
              var services = scope.ServiceProvider;
              try 
              {
                var context = services.GetRequiredService<DataContext>();
                context.Database.Migrate();
                Seed.SeedUsers(context);
              }
              catch(Exception ex)
              {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Error occured During igration");
              }
            }
            webHost.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
