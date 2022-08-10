using System;
using System.Threading.Tasks;
using EventBus.Infrastructure;
using ModelsEvents;

namespace EventsHandlers
{
    public  class ClienteNaoCadastradoHandler : IIntegrationEventHandler<CadastroNaoOk>
    {
        public async Task Handle(CadastroNaoOk @event)
        {
            await Console.Out.WriteAsync("Recebido com não OK, descricao: " + @event.Descriao);
        }
    }
}
