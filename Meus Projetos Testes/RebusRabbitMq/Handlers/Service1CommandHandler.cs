using System.Threading.Tasks;
using Rebus.Bus;
using Rebus.Handlers;
using RebusRabbitMq.Commands;
using RebusRabbitMq.Mensagens.Events;

namespace RebusRabbitMq.Handlers
{
    public class Service1CommandHandler : IHandleMessages<StartService1Command>
    {
        private readonly IBus _bus;

        public Service1CommandHandler(IBus bus)
        {
            _bus = bus;
        }

        public async Task Handle(StartService1Command message)
        {
            await _bus.Publish(new Service1FinishedEvent() { AggregateId = message.AggregateId });
        }
    }
}
