using System;
using System.Threading.Tasks;
using EventBus.Infrastructure;
using ModelsEvents;

namespace EventsHandlers
{
    public class EnviarDadosCadastroHandler : IIntegrationEventHandler<ClientEvent>
    {
        public async Task Handle(ClientEvent @event)
        {
            await Console.Out.WriteAsync("Foi enviado um Cadastro de Cliente!");
        }
    }
}
