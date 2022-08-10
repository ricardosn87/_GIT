using System;
using System.Threading.Tasks;
using MassTransit;
using MassTransitRabbitMQ.Events;

namespace MassTransitRabbitMQ.Consumers
{
    public class EnderecoConsumer : IConsumer<IClienteEvent>
    {
        public async Task Consume(ConsumeContext<IClienteEvent> context)
        {
            await Console.Out.WriteLineAsync(value: context.Message.DataNascimento.ToString());
        }
    }
}
