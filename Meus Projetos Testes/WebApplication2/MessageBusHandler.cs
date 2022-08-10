using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace WebApplication2
{
    public class MessageBusHandler : BackgroundService
    {
        private IMessageBus _bus;
        private readonly IServiceProvider _serviceProvider;

        public MessageBusHandler(
                           IServiceProvider serviceProvider,
                           IMessageBus bus)
        {
            _serviceProvider = serviceProvider;
            _bus = bus;

        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {

            _bus.RespondAsync<EventoExemploEvent, EventoExemploEvent>(async request =>
                await NotificarEventos(request));



            return Task.CompletedTask;
        }

        private async Task<EventoExemploEvent> NotificarEventos(EventoExemploEvent eventoExemplo)
        {
           
                using (var scope = _serviceProvider.CreateScope())
                {
                    var mediator = scope.ServiceProvider.GetRequiredService<IMediatorHandler>();
                    await mediator.PublicarEvento(eventoExemplo);
                }

                return await Task.FromResult(eventoExemplo);
        }
    }

    public class ExemploRecebendoEvent : INotificationHandler<EventoExemploEvent>
    {
        public Task Handle(EventoExemploEvent notification, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

}
