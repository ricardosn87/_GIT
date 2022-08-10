using System;
using System.Threading.Tasks;
using MassTransit;
using MassTransitRabbitMQ.Events;

namespace MassTransitRabbitMQ.Consumers
{
    public class MasterCardConsumer : IConsumer<IMasterCardEventSaga>
    {
        public async Task Consume(ConsumeContext<IMasterCardEventSaga> context)
        {
            Console.WriteLine("MasterCardId: " + context.Message.MasterCardId);
            await Task.CompletedTask;
        }
    }
}
