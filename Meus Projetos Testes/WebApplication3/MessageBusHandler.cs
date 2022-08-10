using System;
using System.Threading;
using System.Threading.Tasks;
using EasyNetQ;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace EasyNetQBus
{
    public class MessageBusHandler : BackgroundService
    {
        private IBus _bus;
        private readonly IServiceProvider _serviceProvider;

        public MessageBusHandler(
                           IServiceProvider serviceProvider,
                           IBus bus)
        {
            _serviceProvider = serviceProvider;
            _bus = bus;
           
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _bus = RabbitHutch.CreateBus("host=localhost:5672;publisherConfirms=true;timeout=10");
            _bus.Rpc.RespondAsync<EventoExemplo, EventoExemplo>(async request =>
                await NotificarEventos(request), cancellationToken: stoppingToken);

            return Task.CompletedTask;
        }

        private async Task<EventoExemplo> NotificarEventos(EventoExemplo eventoExemplo)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var mediator = scope.ServiceProvider.GetRequiredService<IMediatorHandler>();
                await mediator.PublicarEvento(eventoExemplo);
            }

           return await Task.FromResult(eventoExemplo);
        }
    }

    public class EventoExemploRecebendo : INotificationHandler<EventoExemplo>
    {
        public Task Handle(EventoExemplo notification, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
