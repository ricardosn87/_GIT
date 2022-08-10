using System.Threading.Tasks;
using NServiceBus;
using NServiceBus.Persistence;

namespace NServiceBusRabbitMq.Interfaces
{
    public class ServiceBusMessageMensagem : IServiceBusMessage
    {

        public async Task<IEndpointInstance> GetConfiguration()
        {
            EndpointConfiguration endpointConfiguration = new("ExemploSaga.Pedidos");
            var transport = endpointConfiguration.UseTransport<RabbitMQTransport>();

            transport.ConnectionString("host=localhost");
            transport.UseConventionalRoutingTopology();

            

            endpointConfiguration.EnableInstallers();
            endpointConfiguration.UsePersistence<InMemoryPersistence>();
            endpointConfiguration.UsePersistence<NHibernatePersistence>();
            var persistence = endpointConfiguration.UsePersistence<NHibernatePersistence>();
            persistence.ConnectionString(@"Data Source=.\SqlExpress;Database=nservicebus;Integrated Security=True");
            return await Endpoint.Start(endpointConfiguration).ConfigureAwait(true);
        }
    }
}
