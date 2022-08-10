using System.Threading.Tasks;
using Rebus.Bus;
using Rebus.Handlers;
using RebusRabbitMq.Eventos;

namespace RebusRabbitMq.Handlers
{
    public class RemoverEstoqueEventHandler : IHandleMessages<RemoverEstoqueEvent>
    {
        private readonly IBus _bus;

        public RemoverEstoqueEventHandler(IBus bus)
        {
            _bus = bus;
        }

        public async Task Handle(RemoverEstoqueEvent message)
        {
            var estoqueFinalizado = new EstoqueFinalizadoEvent(message.Headers, "");
            await _bus.Publish(estoqueFinalizado);

            var estoqueInconsistente = new EstoqueInconsistenteEvent(message.Headers, "");

            await _bus.Publish(estoqueInconsistente);
            await Task.CompletedTask;
        }
    }
}
