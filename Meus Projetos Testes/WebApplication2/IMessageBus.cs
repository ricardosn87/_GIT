using System;
using System.Threading.Tasks;
using MediatR;

namespace WebApplication2
{
    public interface IMessageBus : IDisposable
    {
        Task Publish(EventoExemploEvent eventoExemplo);


        IDisposable RespondAsync<TRequest, TResponse>(Func<TRequest, Task<TResponse>> responder)
           where TRequest : IntegrationEvent where TResponse : IntegrationEvent;

       
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
        Task PublicarEvento(EventoExemploEvent eventoExemplo);
    }
    public class MediatorHandler : IMediatorHandler
    {
        private readonly IMediator _mediator;

        public MediatorHandler(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task PublicarEvento(EventoExemploEvent eventoExemplo)
        {
            await _mediator.Publish(eventoExemplo);
        }
    }

    public class EventoExemploEvent : IntegrationEvent
    {
        public Guid Id { get; private set; }
        public string Nome { get; private set; }
        public string Email { get; private set; }
        public string Cpf { get; private set; }

        public DateTime DataPublicacao { get; private set; }

        public EventoExemploEvent(Guid id, string nome, string email, string cpf, DateTime dataPublicacao)
        {
            Id = id;
            Nome = nome;
            Email = email;
            Cpf = cpf;
            DataPublicacao = dataPublicacao;
        }
    }
}
