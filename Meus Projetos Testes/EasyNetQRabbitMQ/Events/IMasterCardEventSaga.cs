using System;

namespace MassTransitRabbitMQ.Events
{
    public interface IMasterCardEventSaga
    {
       Guid MasterCardId { get; set; }
    }
}
