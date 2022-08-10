using EventBus.Infrastructure;

namespace ModelsEvents
{
    public class CadastroNaoOk : IIntegrationEvent
    {
        public string Descriao { get; set; }
    }
}
