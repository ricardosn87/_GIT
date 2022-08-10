using System;
using System.Threading.Tasks;
using NServiceBus;
using NServiceBusRabbitMq.Events;

namespace NServiceBusRabbitMq.Handlers
{
    public class VisaBradescoPagoHandler : IHandleMessages<VisaBradescoPagoEvent>
    {
        public Task Handle(VisaBradescoPagoEvent message, IMessageHandlerContext context)
        {
            Console.WriteLine("Handler:  VisaBradescoPagoHandler PagamentoId " + message.PagamentoId);
            Console.WriteLine("Handler: VisaBradescoPagoHandler ValorTotal " + message.ValorTotal);
            Console.WriteLine("Handler: VisaBradescoPagoHandler Processamento " + message.Processamento);
            return Task.CompletedTask;
        }
    }
}
