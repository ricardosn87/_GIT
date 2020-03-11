using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Alura.LeilaoOnline.Core
{
    public class OfertaSuperiorMaisProxima : IModalidadeAvaliacao
    {
        public double valorDestino;

        public OfertaSuperiorMaisProxima(double valorDestino)
        {
            this.valorDestino = valorDestino;
        }

        public Lance Avalia(Leilao leilao)
        {
            return leilao.Lances
                    .DefaultIfEmpty(new Lance(null, 0))
                    .Where(x => x.Valor > valorDestino)
                    .OrderBy(x => x.Valor)
                    .FirstOrDefault();
        }
    }
}
