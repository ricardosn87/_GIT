using System;
using NServiceBus;

namespace NServiceBusRabbitMq.Commands
{
    public class PagamentoVisaBradescoCommand : ICommand
    {
        public Guid PagamentoId { get; set; }
        public decimal ValorTotal { get; set; }

        public PagamentoVisaBradescoCommand(Guid pagamentoId, decimal valorTotal)
        {
            PagamentoId = pagamentoId;
            ValorTotal = valorTotal;
        }
    }
}
