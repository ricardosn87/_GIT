using System;

namespace MassTransitRabbitMQ.Events
{
    public interface IClienteMasterCard
    {
        Guid ClienteMasterCardId { get; set; }
        string Nome { get; set; }
    }
}
