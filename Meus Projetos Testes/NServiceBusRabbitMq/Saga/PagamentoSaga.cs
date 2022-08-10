using System;
using System.Threading;
using System.Threading.Tasks;
using NServiceBus;
using NServiceBusRabbitMq.Commands;
using NServiceBusRabbitMq.Events;

namespace NServiceBusRabbitMq.Saga
{
    public class PagamentoSaga : Saga<PagamentoSagaData>, IAmStartedByMessages<PagamentoNeonCommand>,
        IHandleMessages<NeonPagoEvent>,
        IHandleMessages<PagamentoVisaBradescoCommand>,
        IHandleMessages<VisaBradescoPagoEvent>,
        IHandleMessages<PagamentoNuBankCommand>,
        IHandleMessages<NuBankPagoEvent>
    {
        public async Task Handle(PagamentoNeonCommand message, IMessageHandlerContext context)
        {
            Thread.Sleep(1000);
            await Task.FromResult(context.Publish(new NeonPagoEvent(message.PagamentoId, message.ValorTotal, DateTime.Now)));
        }

        public async Task Handle(NeonPagoEvent message, IMessageHandlerContext context)
        {
            Thread.Sleep(1000);
            await Task.FromResult(context.SendLocal(new PagamentoVisaBradescoCommand(message.PagamentoId, message.ValorTotal)));
        }

        public async Task Handle(PagamentoVisaBradescoCommand message, IMessageHandlerContext context)
        {
            Thread.Sleep(1000);
            await Task.FromResult(context.Publish(new VisaBradescoPagoEvent(message.PagamentoId, message.ValorTotal, DateTime.Now)));
        }

        public async Task Handle(VisaBradescoPagoEvent message, IMessageHandlerContext context)
        {
            Thread.Sleep(1000);
            await Task.FromResult(context.SendLocal(new PagamentoNuBankCommand(message.PagamentoId, message.ValorTotal)));
        }

        public async Task Handle(PagamentoNuBankCommand message, IMessageHandlerContext context)
        {
            Thread.Sleep(1000);
            await Task.FromResult(context.Publish(new NuBankPagoEvent(message.PagamentoId, message.ValorTotal, DateTime.Now)));
        }

        public Task Handle(NuBankPagoEvent message, IMessageHandlerContext context)
        {
            Thread.Sleep(2000);
            Console.WriteLine("Fim de Pagamento Processamento " + message.Processamento);
            Console.WriteLine("Fim de Pagamento.");
            return Task.CompletedTask;
        }
        protected override void ConfigureHowToFindSaga(SagaPropertyMapper<PagamentoSagaData> mapper)
        {
            mapper.ConfigureMapping<PagamentoNeonCommand>(message => message.PagamentoId).ToSaga(saga => saga.Id);
            mapper.ConfigureMapping<NeonPagoEvent>(message => message.PagamentoId).ToSaga(saga => saga.Id);
            mapper.ConfigureMapping<PagamentoVisaBradescoCommand>(message => message.PagamentoId).ToSaga(saga => saga.Id);
            mapper.ConfigureMapping<VisaBradescoPagoEvent>(message => message.PagamentoId).ToSaga(saga => saga.Id);
            mapper.ConfigureMapping<PagamentoNuBankCommand>(message => message.PagamentoId).ToSaga(saga => saga.Id);
            mapper.ConfigureMapping<NuBankPagoEvent>(message => message.PagamentoId).ToSaga(saga => saga.Id);
        }
    }
}
