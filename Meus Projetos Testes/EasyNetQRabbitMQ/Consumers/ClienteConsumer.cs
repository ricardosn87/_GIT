using System.Threading.Tasks;
using MassTransit;
using MassTransitRabbitMQ.Events;

namespace MassTransitRabbitMQ.Consumers
{
    public class ClienteConsumer : IConsumer<IClienteEvent>
    {
        public Task Consume(ConsumeContext<IClienteEvent> context)
        {
            //await Console.Out.WriteLineAsync(value: context.Message.DataNascimento.ToString(CultureInfo.InvariantCulture));

            return context.Publish<IVisaEventSaga>(new
            {
                context.Message.Guid
            });
        }
    }
}
