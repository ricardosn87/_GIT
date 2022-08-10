using System;

namespace MassTransitRabbitMQ.Events
{
    public interface IAmexEventSaga
    {
        Guid AmexId { get; set; }
    }
}
