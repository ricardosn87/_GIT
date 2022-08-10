using System;
using Automatonymous;
using MassTransit;
using MassTransitRabbitMQ.Contrato;
using MassTransitRabbitMQ.Events;

namespace MassTransitRabbitMQ.State
{
    public class PagamentoStateMachine : MassTransitStateMachine<PagamentoState>
    {
        public PagamentoStateMachine()
        {
            try
            {
                InstanceState(x => x.CurrentState);

                Event(() => PagamentoSubmeter, context => context.CorrelateById(m => m.Message.PagamentoId));
                Event(() => MasterCardComandSaga, context => context.CorrelateById(m => m.Message.MasterCardId));
                Event(() => FimProcessoSaga, context => context.CorrelateById(m => m.Message.Fim));

                Initially(When(PagamentoSubmeter)
                    .Then(context =>
                    {
                        context.Instance.CorrelationId = context.Data.PagamentoId;
                    })
                    .PublishAsync(context => context.Init<IClienteVisa>(
                        new
                        {
                            PagamentoId= context.Instance.CorrelationId,
                            ClienteVisaId = context.Instance.CorrelationId,
                            Nome = "Julia Chata"
                        }))
                    .Then(_ => Console.WriteLine("Amex Finalizado"))
                    .TransitionTo(FimProcesso));

                //During(PassoMasterCard,
                //    When(MasterCardComandSaga)
                //        .Then(context =>
                //        {
                //            context.Instance.CorrelationId = context.Data.MasterCardId;
                //        })
                //        .PublishAsync(context => context.Init<IClienteMasterCard>(new
                //        {
                //            ClienteMasterCardId = context.Data.MasterCardId,
                //            Nome = "Julia Chata2"
                //        }))
                //       .Then(_ => Console.WriteLine("Passo Visa Finalizado"))
                //        .TransitionTo(FimProcesso)
                //);

                During(FimProcesso,
                    When(FimProcessoSaga)
                        .Then(_ => Console.WriteLine("Pagamento Finalizado"))
                        .Finalize()
                );
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }


        public Automatonymous.State PassoMasterCard { get; set; }
        public Automatonymous.State FimProcesso { get; set; }


        public Event<PagamentoSubmeter> PagamentoSubmeter { get; set; }
        public Event<IMasterCardEventSaga> MasterCardComandSaga { get; set; }
        public Event<IFimProcessoEventSaga> FimProcessoSaga { get; set; }
    }

    public class PagamentoState :
        SagaStateMachineInstance
    {
        public Guid CorrelationId { get; set; }
        public string CurrentState { get; set; }
    }
}
