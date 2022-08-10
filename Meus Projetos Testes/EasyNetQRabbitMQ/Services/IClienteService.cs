using System;
using System.Threading;
using System.Threading.Tasks;
using MassTransit;
using MassTransitRabbitMQ.Events;

namespace MassTransitRabbitMQ.Services
{
    public interface IClienteService
    {
        Task EnviarMensagem();
        Task EnviarMensagemDireta();
    }

    public class ClienteService : IClienteService
    {
        private readonly IPublishEndpoint _publishEndpoint;

        public ClienteService(IPublishEndpoint publishEndpoint)
        {
            _publishEndpoint = publishEndpoint;
        }
        public async Task EnviarMensagem()
        {
            await _publishEndpoint.Publish<IClienteEvent>(new
            {
                DataNascimento = DateTime.Now,
                Idade = 34,
                Nome = "Ricardo Soares Nogueira."
            });
        }

        public async Task EnviarMensagemDireta()
        {
            var busControl = Bus.Factory.CreateUsingRabbitMq();
            await busControl.StartAsync(new CancellationTokenSource(TimeSpan.FromSeconds(10)).Token);

            try
            {
                var endpoint = await busControl.GetSendEndpoint(new Uri("queue:MassTransit"));
                await endpoint.Send<IClienteEvent>(new
                {
                    DataNascimento = DateTime.Now,
                    Idade = 34,
                    Nome = "Ricardo Soares Nogueira."
                });
            }
            finally
            {
                await busControl.StopAsync();
            }
        }
    }
}
