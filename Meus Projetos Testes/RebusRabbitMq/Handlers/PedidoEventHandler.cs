using System.Collections.Generic;
using System.Threading.Tasks;
using Rebus.Handlers;
using Rebus.Messages;

namespace RebusRabbitMq.Handlers
{
    public class PedidoEventHandler :
        IHandleMessages<EstoqueFinalizadoEvent>,
        IHandleMessages<EstoqueInconsistenteEvent>
    {
        public Task Handle(EstoqueFinalizadoEvent message)
        {
            return Task.CompletedTask;
        }

        public Task Handle(EstoqueInconsistenteEvent message)
        {
            return Task.CompletedTask;
        }
    }

    public class EstoqueInconsistenteEvent : Message
    {
        public EstoqueInconsistenteEvent(Dictionary<string, string> headers, object body) : base(headers, body)
        {
        }
    }

    public class EstoqueFinalizadoEvent : Message
    {
        public EstoqueFinalizadoEvent(Dictionary<string, string> headers, object body) : base(headers, body)
        {
        }
    }
}
