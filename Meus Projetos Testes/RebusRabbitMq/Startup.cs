using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Rebus.Config;
using Rebus.Messages;
using Rebus.Persistence.InMem;
using Rebus.Routing.TypeBased;
using RebusRabbitMq.Commands;
using RebusRabbitMq.Handlers;
using RebusRabbitMq.Mensagens.Events;
using RebusRabbitMq.Orquestrador;
using RebusRabbitMq.Orquestrador.Commands;

namespace RebusRabbitMq
{
    public class Startup
    {
        private const string ConnectionString = @"Data Source=DESKTOP-BHPS316\SQLEXPRESS;Integrated Security=True";

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
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "RebusRabbitMq", Version = "v1" });
            });

            #region RebusSimples

            //var fila = "Fila_Rebus";
            //services.AddRebus(c => c.Transport(t => t.UseRabbitMq("amqp://guest:guest@localhost", fila)));
            //services.AutoRegisterHandlersFromAssemblyOf<RemoverEstoqueEventHandler>();
            //services.AutoRegisterHandlersFromAssemblyOf<PedidoEventHandler>();

            #endregion

            #region RebusSaga

            var mqQueue = "Fila_Rebus_Saga";

            services.AddRebus(configure => configure
                .Transport(t => t.UseRabbitMq("amqp://localhost:5672", mqQueue))
                .Routing(r =>
                {
                    r.TypeBased()
                        .MapAssemblyOf<Message>(mqQueue)
                        .MapAssemblyOf<StartSagaCommand>(mqQueue)
                        .MapAssemblyOf<StartService1Command>(mqQueue)
                        .MapAssemblyOf<StartService2Command>(mqQueue);
                })
                .Sagas(s => s.StoreInMemory())
                .Options(o =>
                {
                    o.SetNumberOfWorkers(1);
                    o.SetMaxParallelism(1);
                    o.SetBusName("RebusDotnetCore Demo");
                })
            );

            services.AutoRegisterHandlersFromAssemblyOf<DemoSaga>();
            services.AutoRegisterHandlersFromAssemblyOf<Service1CommandHandler>();
            services.AutoRegisterHandlersFromAssemblyOf<Service2CommandHandler>();

            #endregion


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {


            #region RebusSimples

            //app.ApplicationServices.UseRebus(c =>
            //{
            //    c.Subscribe<RemoverEstoqueEvent>().Wait();
            //    c.Subscribe<EstoqueFinalizadoEvent>().Wait();
            //    c.Subscribe<EstoqueInconsistenteEvent>().Wait();
            //});

            #endregion

            #region RebusSaga

            app.ApplicationServices.UseRebus(async bus =>
            {
                await bus.Subscribe<SagaStartedEvent>();
                await bus.Subscribe<Service1FinishedEvent>();
                await bus.Subscribe<Service1CompletedEvent>();
                await bus.Subscribe<Service2FinishedEvent>();
            });

            #endregion

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RebusRabbitMq v1"));
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
