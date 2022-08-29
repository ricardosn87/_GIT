using System;
using System.Threading.Tasks;
using EasyNetQ;
using SexFriend.Core.Messages.Integration;
using Polly;
using RabbitMQ.Client.Exceptions;

namespace SexFriend.Principal.MessageBus
{
    public class MessageBus : IMessageBus
    {
        private IBus _bus;
        private IAdvancedBus _advancedBus;

        private readonly string _connectionString;

        public MessageBus(string connectionString)
        {
            _connectionString = connectionString;
            TryConnect();
        }

        public bool IsConnected => _bus?.IsConnected ?? false;
        public IAdvancedBus AdvancedBus => _bus?.Advanced;

        public void Publish<T>(T message) where T : IntegrationEvent
        {
            TryConnect();
            _bus.Publish(message);
        }

        public async Task PublishAsync<T>(T message) where T : IntegrationEvent
        {
            TryConnect();
            await _bus.PublishAsync(message);
        }

        public void Subscribe<T>(string subscriptionId, Action<T> onMessage) where T : class
        {
            TryConnect();
            _bus.Subscribe(subscriptionId, onMessage);
        }

        public void SubscribeAsync<T>(string subscriptionId, Func<T, Task> onMessage) where T : class
        {
            TryConnect();
            _bus.SubscribeAsync(subscriptionId, onMessage);
        }

        public TRespoSexFriend Request<TRequest, TRespoSexFriend>(TRequest request) where TRequest : IntegrationEvent
            where TRespoSexFriend : RespoSexFriendMessage
        {
            TryConnect();
            return _bus.Request<TRequest, TRespoSexFriend>(request);
        }

        public async Task<TRespoSexFriend> RequestAsync<TRequest, TRespoSexFriend>(TRequest request)
            where TRequest : IntegrationEvent where TRespoSexFriend : RespoSexFriendMessage
        {
            TryConnect();
            return await _bus.RequestAsync<TRequest, TRespoSexFriend>(request);
        }

        public IDisposable Respond<TRequest, TRespoSexFriend>(Func<TRequest, TRespoSexFriend> responder)
            where TRequest : IntegrationEvent where TRespoSexFriend : RespoSexFriendMessage
        {
            TryConnect();
            return _bus.Respond(responder);
        }

        public IDisposable RespondAsync<TRequest, TRespoSexFriend>(Func<TRequest, Task<TRespoSexFriend>> responder)
            where TRequest : IntegrationEvent where TRespoSexFriend : RespoSexFriendMessage
        {
            TryConnect();
            return _bus.RespondAsync(responder);
        }

        private void TryConnect()
        {
            if (IsConnected) return;

            var policy = Policy.Handle<EasyNetQException>()
                .Or<BrokerUnreachableException>()
                .WaitAndRetry(3, retryAttempt =>
                    TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

            policy.Execute(() =>
            {
                _bus = RabbitHutch.CreateBus(_connectionString);
                _advancedBus = _bus.Advanced;
                _advancedBus.Disconnected += OnDisconnect;
            });
        }

        private void OnDisconnect(object s, EventArgs e)
        {
            var policy = Policy.Handle<EasyNetQException>()
                .Or<BrokerUnreachableException>()
                .RetryForever();

            policy.Execute(TryConnect);
        }

        public void Dispose()
        {
            _bus.Dispose();
        }
    }
}