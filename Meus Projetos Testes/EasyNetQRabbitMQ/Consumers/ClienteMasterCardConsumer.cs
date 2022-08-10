using System;
using System.Threading.Tasks;
using MassTransit;
using MassTransitRabbitMQ.Events;

namespace MassTransitRabbitMQ.Consumers
{
    public class ClienteMasterCardConsumer : IConsumer<IClienteMasterCard>
    {
        public Task Consume(ConsumeContext<IClienteMasterCard> context)
        {
            Console.Out.WriteLineAsync(value: "Nome Julia Composto:" + context.Message.Nome);

            return Task.CompletedTask;

            //return context.Publish<IFimProcessoEventSaga>(new
            //{
            //    context.Message.ClienteMasterCardId
            //});
        }
    }
}
