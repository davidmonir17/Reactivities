using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
        var host= CreateHostBuilder(args).Build();
        var scoop=host.Services.CreateScope();
        var Service=scoop.ServiceProvider;
        try
        {
            var context=Service.GetRequiredService<DataContext>();
            var userManger=Service.GetRequiredService<UserManager<AppUser>>();
            await  context.Database.MigrateAsync();
            await Seed.SeedData(context,userManger);
        }
        catch (Exception ex)
        {
            var logger=Service.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex ,"error in migration" );
        }
        await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
