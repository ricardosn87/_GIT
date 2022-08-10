using System;
using System.Threading.Tasks;
using EventBus.Infrastructure;
using ModelsEvents;

namespace EventsHandlers
{
    public class ClienteCadastradoHandler : IIntegrationEventHandler<CadastroOkEvent>
    {
        private readonly IEventBus _eventBus;

        public ClienteCadastradoHandler(IEventBus eventBus)
        {
            _eventBus = eventBus;
        }
        public async Task Handle(CadastroOkEvent @event)
        {
            if (@event.CadastroOk)
                await Console.Out.WriteAsync("Recebido com OK");
            else
            {
                var cadastroNaoOk = new CadastroNaoOk()
                {
                    Descriao = "Não foi cadastrado"
                };

                _eventBus.Publish(cadastroNaoOk, nameof(CadastroNaoOk));
            }
        }
    }
}
