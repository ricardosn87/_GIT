using System;
using System.Text;
using EasyNetQ;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace SexFriend.EventsInfra
{
    public class EventBus : IEventBus
    {
        private bool _disposed;

        private readonly IConnection _connection;
        
        private IModel _channel;
        private IModel Model
        {
            get
            {
                if (_channel == null)
                    _channel = _connection.CreateModel();

                return _channel;
            }
        }
        private readonly IServiceProvider _provider;
        public EventBus(IConfiguration config, IServiceProvider provider)
        {
            _provider = provider;

            var connectionFactory = new ConnectionFactory
            {
                HostName = "localhost",
                Port = 5672,
                UserName = "guest",
                Password = "guest",
                DispatchConsumersAsync = true
            };

            _connection = connectionFactory.CreateConnection();
            
        }

        public void Publish(IIntegrationEvent @event, string exchangeName)
        {
            CreateExchangeIfNotExists(exchangeName);

            var jsonMessage = JsonConvert.SerializeObject(@event);
            var bytesMessage = Encoding.UTF8.GetBytes(jsonMessage);

            Model.BasicPublish(exchangeName, string.Empty, body: bytesMessage);
        }

        public void Subscribe<TH, TE>(string exchangeName, string subscriberName)
            where TH : IIntegrationEventHandler<TE>
            where TE : IIntegrationEvent
        {
            BindQueue(exchangeName, subscriberName);

            var consumer = new AsyncEventingBasicConsumer(Model);

            consumer.Received += async (obj, args) =>
            {
                using (var scope = _provider.CreateScope())
                {
                    var handler = scope.ServiceProvider.GetRequiredService<IIntegrationEventHandler<TE>>();
                    var jsonMessage = Encoding.UTF8.GetString(args.Body.ToArray());
                    var message = JsonConvert.DeserializeObject<TE>(jsonMessage);

                    await handler.Handle(message);

                    Model.BasicAck(args.DeliveryTag, false);
                }
            };

            Model.BasicConsume(string.Empty, false, consumer);
        }

        private void BindQueue(string exchangeName, string subscriberName)
        {
            CreateExchangeIfNotExists(exchangeName);

            Model.QueueDeclare(subscriberName, true, false, autoDelete: false);
            Model.QueueBind(subscriberName, exchangeName, "");
        }
        private void CreateExchangeIfNotExists(string exchangeName)
        {
            Model.ExchangeDeclare(exchangeName, ExchangeType.Fanout, true);
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (_disposed)
                return;

            if (disposing)
            {
                _channel?.Dispose();
                _connection?.Dispose();
            }

            _disposed = true;
        }

       
    }
}
