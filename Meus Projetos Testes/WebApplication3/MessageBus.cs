using System.Threading.Tasks;
using EasyNetQ;

namespace EasyNetQBus
{
    public class MessageBus : IMessageBus
    {
        private IBus _bus;
        private IAdvancedBus _advancedBus;

        public MessageBus()
        {
            
           
        }

        public async Task Publish(EventoExemplo eventoExemplo)
        {
            if (_bus!.Advanced.IsConnected)
            {
                await _bus.PubSub.PublishAsync(eventoExemplo);
            }
        
        }
        public void Dispose()
        {
            _bus.Dispose();
        }
    }
}
