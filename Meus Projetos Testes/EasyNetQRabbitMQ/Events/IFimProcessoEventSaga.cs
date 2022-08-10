using System;

namespace MassTransitRabbitMQ.Events
{
    public interface IFimProcessoEventSaga
    {
        Guid Fim { get; set; }
    }
}
