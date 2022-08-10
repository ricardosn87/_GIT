using System;
using Automatonymous;

namespace MassTransitRabbitMQ.State
{
    public class SubmitOrder
    {
        public Guid OrderId { get; set; }
    }

    public interface SubmitOrder2
    {
        public Guid OrderId { get; set; }
    }
    public interface SubmitOrder3
    {
        public Guid OrderId { get; set; }
    }
    public class TesteStateMachine : MassTransitStateMachine<TesteState>
    {
        public TesteStateMachine()
        {
            Event(() => SubmitOrder, x => x.CorrelateById(context => context.Message.OrderId));
            Event(() => SubmitOrder2, x => x.CorrelateById(context => context.Message.OrderId));
            Event(() => SubmitOrder3, x => x.CorrelateById(context => context.Message.OrderId));

            InstanceState(x => x.CurrentState);

            Initially(When(SubmitOrder).Then(context =>
                {
                    context.Instance.CorrelationId = context.Data.OrderId;
                }).TransitionTo(ProximoPasso1)
                .Then(_ => Console.WriteLine("Indo para o Passo1")));


            During(ProximoPasso1, When(SubmitOrder2)
                .Then(context => { context.Data.OrderId = context.Instance.CorrelationId; }
                )
                .TransitionTo(ProximoPasso2)
                .Then(_ => Console.WriteLine("Indo para o Passo2")));


            During(ProximoPasso2, When(SubmitOrder3)
                .Then(context => { context.Data.OrderId = context.Instance.CorrelationId; }
                )
                .Then(_ => Console.WriteLine("Terminou"))
                .Finalize());
        }


        public Automatonymous.State ProximoPasso1 { get; private set; }
        public Automatonymous.State ProximoPasso2 { get; private set; }
        public Event<SubmitOrder> SubmitOrder { get; private set; }
        public Event<SubmitOrder2> SubmitOrder2 { get; private set; }
        public Event<SubmitOrder3> SubmitOrder3 { get; private set; }
    }

    public class TesteState :
        SagaStateMachineInstance
    {
        public Guid CorrelationId { get; set; }
        public string CurrentState { get; set; }
    }
}
