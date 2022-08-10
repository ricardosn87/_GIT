using EventBus.Infrastructure;

namespace ModelsEvents
{
    public class CadastroOkEvent : IIntegrationEvent
    {
        public bool CadastroOk { get; set; }
    }
}
