using System;
using System.Threading.Tasks;
using EasyNetQ;

namespace WebApplication2
{
    public class MessageBus : IMessageBus
    {
        private IBus _bus;
        private IAdvancedBus _advancedBus;


        public MessageBus()
        {
            _bus = RabbitHutch.CreateBus("host=localhost:5672;publisherConfirms=true;timeout=500");
        }

        public async Task Publish(EventoExemploEvent eventoExemplo)
        {
            try
            {
                if (_bus!.IsConnected)
                {
                    var sucesso = await _bus.RequestAsync<EventoExemploEvent, EventoExemploEvent>(eventoExemplo);

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }

        public IDisposable RespondAsync<TRequest, TResponse>(Func<TRequest, Task<TResponse>> responder)
           where TRequest : IntegrationEvent where TResponse : IntegrationEvent
        {

            var sucesso = _bus.RespondAsync(responder);
            return sucesso;
        }
        public void Dispose()
        {
            _bus.Dispose();
        }

    }
}
