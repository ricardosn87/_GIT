using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Alura.LeilaoOnline.Core
{

    public enum EstadoLeilao
    {
        LeilaoFinalizado,
        LeiaoEmAndamento
    }

    public class Leilao
    {
        private Interessada _ultimoCliente;
        private IList<Lance> _lances;
        private IModalidadeAvaliacao _modalidadeAvaliacao;


        public IEnumerable<Lance> Lances => _lances;
        public string Peca { get; }
        public Lance Ganhador { get; private set; }

        public EstadoLeilao EstadoLeilao { get; private set; }

        public Leilao(string peca, IModalidadeAvaliacao modalidadeAvaliacao)
        {
            Peca = peca;
            _lances = new List<Lance>();
            _modalidadeAvaliacao = modalidadeAvaliacao;
        }

        private bool NovoLanceAceito(Interessada interessada, double valor)
        {
            return (EstadoLeilao == EstadoLeilao.LeiaoEmAndamento) &&
                (interessada != _ultimoCliente);
        }

        public void RecebeLance(Interessada cliente, double valor)
        {
            if (NovoLanceAceito(cliente, valor))
            {
                Ganhador = new Lance(cliente, valor);
                _lances.Add(Ganhador);
                _ultimoCliente = cliente;
            }
        }

        public void IniciaPregao()
        {
            EstadoLeilao = EstadoLeilao.LeiaoEmAndamento;
        }

        public void TerminaPregao()
        {
            if (EstadoLeilao != EstadoLeilao.LeiaoEmAndamento)
            {
                throw new InvalidOperationException("Utilize o metodo IniciaPregao()");
            }
            _modalidadeAvaliacao.Avalia(this);

            EstadoLeilao = EstadoLeilao.LeilaoFinalizado;
        }
    }
}
