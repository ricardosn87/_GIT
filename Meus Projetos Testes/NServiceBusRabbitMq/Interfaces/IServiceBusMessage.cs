using System.Threading.Tasks;
using NServiceBus;

namespace NServiceBusRabbitMq.Interfaces
{
    public interface IServiceBusMessage
    {
        Task<IEndpointInstance> GetConfiguration();
    }
}
