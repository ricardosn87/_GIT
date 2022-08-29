using System.Threading.Tasks;

namespace SexFriend.EventsInfra
{
    public interface IIntegrationEventHandler<in TE>
        where TE : IIntegrationEvent
    {
        Task Handle(TE @event);
    }
}
