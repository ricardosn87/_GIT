using System.Reflection;
using GreenPipes;
using MassTransitRabbitMQ.Consumers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MassTransit;
using MassTransitRabbitMQ.Services;
using MassTransitRabbitMQ.State;


namespace MassTransitRabbitMQ
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
            services.AddScoped<IClienteService, ClienteService>();

            services.AddMassTransit(cfg =>
            {
                var entryAssembly = Assembly.GetEntryAssembly();
                cfg.AddConsumers(entryAssembly);
                cfg.AddSagaStateMachine<TesteStateMachine, TesteState>().InMemoryRepository();
                cfg.AddSagaStateMachine<PagamentoStateMachine, PagamentoState>().InMemoryRepository();

                cfg.AddConsumer<ClienteConsumer>();
                cfg.AddConsumer<EnderecoConsumer>();

                cfg.UsingRabbitMq((context, config) =>
                {
                    config.ReceiveEndpoint("teste-saga", e =>
                    {
                        e.UseMessageRetry(r => r.Immediate(50));
                        e.UseInMemoryOutbox();
                        e.StateMachineSaga<TesteState>(context);
                    });

                    config.ReceiveEndpoint("pagamento-saga", e =>
                    {
                        e.UseMessageRetry(r => r.Immediate(50));
                        e.UseInMemoryOutbox();
                        e.StateMachineSaga<PagamentoState>(context);
                        e.Consumer<ClienteMasterCardConsumer>();
                        e.Consumer<ClienteVisaConsumer>();
                    });

                    config.ReceiveEndpoint("MassTransit", e =>
                    {
                        e.ConfigureConsumer<ClienteConsumer>(context);
                    });

                    config.ReceiveEndpoint("MassTransit2",e=>
                    {
                        e.ConfigureConsumer<EnderecoConsumer>(context);
                    });

                    config.Host("localhost", "/", h =>
                    {
                        h.Username("guest");
                        h.Password("guest");
                    });
                });
            });

            services.AddMassTransitHostedService();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "EasyNetQRabbitMQ", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EasyNetQRabbitMQ v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
