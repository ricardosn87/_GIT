using System.Collections.Generic;
using Rebus.Messages;

namespace RebusRabbitMq.Eventos
{
    public class RemoverEstoqueEvent : Message
    {
        public RemoverEstoqueEvent(Dictionary<string, string> headers, object body, int numeroPedido) : base(headers, body)
        {
            NumeroPedido = numeroPedido;
        }

        public int NumeroPedido { get; set; }
    }
}
