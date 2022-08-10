using System;
using System.Threading.Tasks;
using NServiceBus;
using NServiceBusRabbitMq.Events;

namespace NServiceBusRabbitMq.Handlers
{
    public class NeonPagoHandler : IHandleMessages<NeonPagoEvent>
    {
        public Task Handle(NeonPagoEvent message, IMessageHandlerContext context)
        {
            Console.WriteLine("Handler:  NeonPagoHandler PagamentoId " + message.PagamentoId);
            Console.WriteLine("Handler: NeonPagoHandler ValorTotal " + message.ValorTotal);
            Console.WriteLine("Handler: NeonPagoHandler Processamento " + message.Processamento);
            return Task.CompletedTask;
        }
    }
}