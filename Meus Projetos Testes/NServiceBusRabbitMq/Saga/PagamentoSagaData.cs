using System;
using NServiceBus;

namespace NServiceBusRabbitMq.Saga
{
    public class PagamentoSagaData : ContainSagaData
    {
        public virtual Guid Id { get; set; }
        //public string Originator { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        //public string OriginalMessageId { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}


