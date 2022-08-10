using System;
using EventBus.Infrastructure;

namespace ModelsEvents
{
    public class ClientEvent : IIntegrationEvent
    {
        public string Nome { get; set; }
        public int Idade { get; set; }
        public DateTime Ocorrencia { get; set; }
    }
}
