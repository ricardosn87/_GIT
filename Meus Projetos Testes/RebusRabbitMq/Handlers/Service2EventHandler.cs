using System.Threading.Tasks;
using Rebus.Bus;
using Rebus.Handlers;
using RebusRabbitMq.Commands;
using RebusRabbitMq.Mensagens.Events;

namespace RebusRabbitMq.Handlers
{
    public class Service2EventHandler : IHandleMessages<Service1CompletedEvent>
    {
        private readonly IBus _bus;

        public Service2EventHandler(IBus bus)
        {
            this._bus = bus;
        }

        public async Task Handle(Service1CompletedEvent message)
        {
            await _bus.Send(new StartService2Command { AggregateId = message.AggregateId });
        }
    }
}
