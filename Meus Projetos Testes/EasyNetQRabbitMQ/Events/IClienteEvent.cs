using System;

namespace MassTransitRabbitMQ.Events
{
    public interface IClienteEvent
    {
        public DateTime DataNascimento { get; set; }
        public int Idade { get; set; }
        public string Nome { get; set; }
        public Guid Guid { get; set; }
    }
}