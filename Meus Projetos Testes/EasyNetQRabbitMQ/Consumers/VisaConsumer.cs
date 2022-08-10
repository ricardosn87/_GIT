using System;
using System.Threading.Tasks;
using MassTransit;
using MassTransitRabbitMQ.Events;

namespace MassTransitRabbitMQ.Consumers
{
    public class VisaConsumer : IConsumer<IVisaEventSaga>
    {
        public async Task Consume(ConsumeContext<IVisaEventSaga> context)
        {
            //return context.Publish<IMasterCardEventSaga>(new
            //{
            //    context.Message.VisaId
            //});
            Console.WriteLine("MasterCardId: " + context.Message.VisaId);
            await Task.CompletedTask;
        }
    }
}
