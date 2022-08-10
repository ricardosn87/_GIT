using System;
using System.Threading.Tasks;
using MassTransit;
using MassTransitRabbitMQ.Events;

namespace MassTransitRabbitMQ.Consumers
{
    public class ClienteVisaConsumer : IConsumer<IClienteVisa>
    {
        public async Task Consume(ConsumeContext<IClienteVisa> context)
        {
            await Console.Out.WriteLineAsync(value: "Nome Julia:" + context.Message.Nome);
            await Task.CompletedTask;

            //return context.Publish<IClienteMasterCard>(new
            //{
            //    ClienteMasterCardId = context.Message.ClienteVisaId
            //});
        }
    }
}
