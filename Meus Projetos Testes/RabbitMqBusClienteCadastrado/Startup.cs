using EventBus.Infrastructure;
using EventsHandlers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ModelsEvents;

namespace RabbitMqBusClienteCadastrado
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
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "RabbitMqBusClienteCadastrado", Version = "v1" });
            });

            services.AddSingleton<IEventBus, EventBus.Infrastructure.EventBus>();
            services.AddScoped<IIntegrationEventHandler<CadastroOkEvent>, ClienteCadastradoHandler>();
            services.AddScoped<IIntegrationEventHandler<CadastroNaoOk>, ClienteNaoCadastradoHandler>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RabbitMqBusClienteCadastrado v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            var eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();
            eventBus.Subscribe<ClienteCadastradoHandler, CadastroOkEvent>(nameof(CadastroOkEvent), env.ApplicationName);
            eventBus.Subscribe<ClienteNaoCadastradoHandler, CadastroNaoOk>(nameof(CadastroNaoOk), env.ApplicationName);
        }
    }
}
