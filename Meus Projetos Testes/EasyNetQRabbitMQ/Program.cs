using MassTransit.Definition;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;

namespace MassTransitRabbitMQ
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureServices((hostContext, services) =>
                {
                    services.TryAddSingleton(KebabCaseEndpointNameFormatter.Instance);
                    //services.AddMassTransit(x =>
                    //{
                    //    var entryAssembly = Assembly.GetEntryAssembly();
                    //    x.AddConsumers(entryAssembly);

                    //    x.UsingRabbitMq((context, cfg) => { cfg.ConfigureEndpoints(context); });
                    //});
                    //services.AddMassTransitHostedService(true);
                    services.AddHostedService<Worker>();
                });
    }
}
