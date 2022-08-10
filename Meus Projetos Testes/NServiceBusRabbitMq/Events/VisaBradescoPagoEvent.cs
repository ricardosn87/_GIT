using System;
using NServiceBus;

namespace NServiceBusRabbitMq.Events
{
    public class VisaBradescoPagoEvent : IEvent
    {
        public Guid PagamentoId { get; set; }
        public decimal ValorTotal { get; set; }
        public DateTime Processamento { get; set; }
        public VisaBradescoPagoEvent(Guid pagamentoId, decimal valorTotal, DateTime processamento)
        {
            PagamentoId = pagamentoId;
            ValorTotal = valorTotal;
            Processamento = processamento;
        }
    }
}