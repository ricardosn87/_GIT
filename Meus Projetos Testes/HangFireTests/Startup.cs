using Hangfire;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HangFireTests
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddHangfire(x => x.UseSqlServerStorage("Data Source=DESKTOP-BHPS316\\SQLEXPRESS;Initial Catalog=Cadastro;Integrated Security=True"));
            services.AddHangfireServer();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
           
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseHangfireDashboard("/hangfire");

            BackgroundJob.Enqueue(() => MeuPrimeiroJobForgert());

            RecurringJob.AddOrUpdate(() => MeuPrimeiroRecurringJob(),Cron.Hourly,null);

            BackgroundJob.Schedule(() => MeuPrimeiroScheduleJob(),TimeSpan.FromDays(2));

            string jobId = BackgroundJob.Enqueue(() => MeuPrimeiroJobForgertFilha());
            BackgroundJob.ContinueJobWith(jobId, () => MeuPrimeiroJobForgertPai());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public async Task MeuPrimeiroJobForgertPai()
        {
            await Task.Run(() =>
            {
                Console.WriteLine("Bem Vindo ao hangfire MeuPrimeiroJobForgertPai");
            });
        }

        public async Task MeuPrimeiroJobForgertFilha()
        {
            await Task.Run(() =>
            {
                Console.WriteLine("Bem Vindo ao hangfire MeuPrimeiroJobForgertFilha");
            });
        }

        public async Task MeuPrimeiroScheduleJob()
        {
            await Task.Run(() =>
            {
                Console.WriteLine("Bem Vindo ao hangfire MeuPrimeiroScheduleJob");
            });
        }

        public async Task MeuPrimeiroRecurringJob()
        {
            await Task.Run(() =>
            {
                Console.WriteLine("Bem Vindo ao hangfire MeuPrimeiroRecurringJob");
            });
        }

        public async Task MeuPrimeiroJobForgert()
        {
            await Task.Run(() =>
            {
                Console.WriteLine("Bem Vindo ao hangfire MeuPrimeiroJobForgert");
            });
        }
    }
}
