using System;

namespace RebusRabbitMq.Mensagens
{
    public abstract class Mensagem
    {
        public Guid AggregateId { get; set; }
        public DateTime DateTime { get; set; }
        protected Mensagem()
        {
            DateTime = DateTime.Now;
        }
    }
}
