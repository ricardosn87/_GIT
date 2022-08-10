using System;

namespace MassTransitRabbitMQ.Events
{
    public interface IClienteVisa
    {
        Guid PagamentoId { get; set; }
        Guid ClienteVisaId { get; set; }
        string Nome { get; set; }

    }
}
