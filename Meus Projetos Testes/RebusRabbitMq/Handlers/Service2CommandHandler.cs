using System.Threading.Tasks;
using Rebus.Bus;
using Rebus.Handlers;
using RebusRabbitMq.Commands;
using RebusRabbitMq.Mensagens.Events;

namespace RebusRabbitMq.Handlers
{
    public class Service2CommandHandler : IHandleMessages<StartService2Command>
    {
        private readonly IBus _bus;

        public Service2CommandHandler(IBus bus)
        {
            _bus = bus;
        }

        public async Task Handle(StartService2Command message)
        {
            await _bus.Publish(new Service2FinishedEvent() { AggregateId = message.AggregateId });
        }
    }
}
