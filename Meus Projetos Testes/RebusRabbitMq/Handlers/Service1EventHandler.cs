using System.Threading.Tasks;
using Rebus.Bus;
using Rebus.Handlers;
using RebusRabbitMq.Commands;
using RebusRabbitMq.Mensagens.Events;

namespace RebusRabbitMq.Handlers
{
    public class Service1EventHandler : IHandleMessages<SagaStartedEvent>
    {
        private readonly IBus _bus;

        public Service1EventHandler(IBus bus)
        {
            this._bus = bus;
        }

        public async Task Handle(SagaStartedEvent message)
        {
            await _bus.Send(new StartService1Command { AggregateId = message.AggregateId });
        }
    }
}
