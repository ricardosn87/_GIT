using System;
using System.Threading.Tasks;
using MediatR;

namespace EasyNetQBus
{
    public interface IMessageBus : IDisposable
    {
        Task Publish(EventoExemplo eventoExemplo);
    }

    public abstract class IntegrationEvent : Event
    {

    }

    public class Event : INotification
    {
        public DateTime Timestamp { get; private set; }

        protected Event()
        {
            Timestamp = DateTime.Now;
        }
    }

    public interface IMediatorHandler
    {
        Task PublicarEvento(EventoExemplo eventoExemplo);
    }
    public class MediatorHandler : IMediatorHandler
    {
        private readonly IMediator _mediator;

        public MediatorHandler(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task PublicarEvento(EventoExemplo eventoExemplo)
        {
            await _mediator.Publish(eventoExemplo);
        }
    }

    public class EventoExemplo : INotification
    {
        public Guid Id { get; private set; }
        public string Nome { get; private set; }
        public string Email { get; private set; }
        public string Cpf { get; private set; }

        public EventoExemplo(Guid id, string nome, string email, string cpf)
        {
            Id = id;
            Nome = nome;
            Email = email;
            Cpf = cpf;
        }
    }
}
