using System;
using System.Threading.Tasks;
using NServiceBus;
using NServiceBusRabbitMq.Events;

namespace NServiceBusRabbitMq.Handlers
{
    public class NuBankPagoHandler : IHandleMessages<NuBankPagoEvent>
    {
        public Task Handle(NuBankPagoEvent message, IMessageHandlerContext context)
        {
            Console.WriteLine("Handler:  NuBankPagoHandler PagamentoId " + message.PagamentoId);
            Console.WriteLine("Handler: NuBankPagoHandler ValorTotal " + message.ValorTotal);
            Console.WriteLine("Handler: NuBankPagoHandler Processamento " + message.Processamento);
            return Task.CompletedTask;
        }
    }
}