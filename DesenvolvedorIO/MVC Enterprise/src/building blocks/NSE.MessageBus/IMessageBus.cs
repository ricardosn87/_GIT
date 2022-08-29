using System;
using System.Threading.Tasks;
using EasyNetQ;
using SexFriend.Core.Messages.Integration;

namespace SexFriend.Principal.MessageBus
{
    public interface IMessageBus : IDisposable
    {
        bool IsConnected { get; }
        IAdvancedBus AdvancedBus { get; }

        void Publish<T>(T message) where T : IntegrationEvent;

        Task PublishAsync<T>(T message) where T : IntegrationEvent;

        void Subscribe<T>(string subscriptionId, Action<T> onMessage) where T : class;

        void SubscribeAsync<T>(string subscriptionId, Func<T, Task> onMessage) where T : class;

        TRespoSexFriend Request<TRequest, TRespoSexFriend>(TRequest request)
            where TRequest : IntegrationEvent
            where TRespoSexFriend : RespoSexFriendMessage;

        Task<TRespoSexFriend> RequestAsync<TRequest, TRespoSexFriend>(TRequest request)
            where TRequest : IntegrationEvent
            where TRespoSexFriend : RespoSexFriendMessage;

        IDisposable Respond<TRequest, TRespoSexFriend>(Func<TRequest, TRespoSexFriend> responder)
            where TRequest : IntegrationEvent
            where TRespoSexFriend : RespoSexFriendMessage;

        IDisposable RespondAsync<TRequest, TRespoSexFriend>(Func<TRequest, Task<TRespoSexFriend>> responder)
            where TRequest : IntegrationEvent
            where TRespoSexFriend : RespoSexFriendMessage;
    }
}