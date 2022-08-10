using System;
using NServiceBus;

namespace NServiceBusRabbitMq.Events
{
    public class NeonPagoEvent : IEvent
    {
        public Guid PagamentoId { get; set; }
        public decimal ValorTotal { get; set; }

        public DateTime Processamento { get; set; }

        public NeonPagoEvent(Guid pagamentoId, decimal valorTotal, DateTime processamento)
        {
            PagamentoId = pagamentoId;
            ValorTotal = valorTotal;
            Processamento = processamento;
        }
    }
}
