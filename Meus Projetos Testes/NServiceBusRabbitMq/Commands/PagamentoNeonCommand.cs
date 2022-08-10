using System;
using NServiceBus;

namespace NServiceBusRabbitMq.Commands
{
    public class PagamentoNeonCommand : ICommand
    {
        public Guid PagamentoId { get; set; }
        public decimal ValorTotal { get; set; }

        public PagamentoNeonCommand(Guid pagamentoId, decimal valorTotal)
        {
            PagamentoId = pagamentoId;
            ValorTotal = valorTotal;
        }
    }
}
