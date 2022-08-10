using System.Threading.Tasks;
using GreenPipes;
using MassTransit;
using MassTransit.ConsumeConfigurators;
using MassTransit.Definition;
using MassTransitRabbitMQ.Commands;
using MassTransitRabbitMQ.Events;

namespace MassTransitRabbitMQ.Consumers
{
    public class AmexConsumer : IConsumer<AmexComand>
    {
        public Task Consume(ConsumeContext<AmexComand> context)
        {
            return context.Publish<IVisaEventSaga>(new
            {
                context.Message.AmexId
            });
        }
    }
    public class AmexConsumerDefinition : ConsumerDefinition<AmexConsumer>
    {
        protected override void ConfigureConsumer(IReceiveEndpointConfigurator endpointConfigurator, IConsumerConfigurator<AmexConsumer> consumerConfigurator)
        {
            consumerConfigurator.UseMessageRetry(r => r.Immediate(10));
        }
    }
}
