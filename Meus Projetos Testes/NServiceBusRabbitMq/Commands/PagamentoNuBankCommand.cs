using System;
using NServiceBus;

namespace NServiceBusRabbitMq.Commands
{
    public class PagamentoNuBankCommand : ICommand
    {
        public Guid PagamentoId { get; set; }
        public decimal ValorTotal { get; set; }

        public PagamentoNuBankCommand(Guid pagamentoId, decimal valorTotal)
        {
            PagamentoId = pagamentoId;
            ValorTotal = valorTotal;
        }
    }
}
