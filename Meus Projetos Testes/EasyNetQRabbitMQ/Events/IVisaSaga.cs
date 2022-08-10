using System;

namespace MassTransitRabbitMQ.Events
{
    public interface IVisaEventSaga
    {
        Guid VisaId { get; set; }
    }
}
