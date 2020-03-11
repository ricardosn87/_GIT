using Alura.LeilaoOnline.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace Alura.LeilaoOnLine.Tests
{
    public class LeilaoTerminaPregao
    {
        [Theory]
        [InlineData(1200,1250, new double[] { 800, 1150, 1400, 1250})]
        public void RetornaValorSuperiorMaisProximoDadoLeilaoNessaModalidade(
            double valorDestino,double valorEsperado, double[] ofertas
            )
        {

            IModalidadeAvaliacao modalidade = new OfertaSuperiorMaisProxima(valorDestino);
            var leilao = new Leilao("Van Gogh", modalidade);
            var fulano = new Interessada("Fulano", leilao);
            var maria = new Interessada("Maria", leilao);

            leilao.IniciaPregao();

            for (int i = 0; i < ofertas.Length; i++)
            {
                var valor = ofertas[i];
                if ((i % 2) == 0)
                {
                    leilao.RecebeLance(fulano, valor);
                }
                else
                {
                    leilao.RecebeLance(maria, valor);
                }
            }

            leilao.TerminaPregao();

            var valorObtido = leilao.Ganhador.Valor;

            Assert.Equal(valorEsperado, valorObtido);

        }       

        [Fact]
        public void LancaInvalidOperationExceptionDadoPregaoNaoIniciado()
        {
            var modalidade = new MaiorValor();
            var leilao = new Leilao("Van Gogh", modalidade);

            var excecaoObtida = Assert.Throws<InvalidOperationException>(
                () => leilao.TerminaPregao()
                );
            var msgEsperada = "Utilize o metodo IniciaPregao()";
            Assert.Equal(msgEsperada, excecaoObtida.Message);
        }

        [Fact]
        public void RetornaZeroLeilaoSemLances()
        {
            var modalidade = new MaiorValor();
            var leilao = new Leilao("Van Gogh",modalidade);

            leilao.IniciaPregao();

            leilao.TerminaPregao();

            var valorEsperado = 0;
            var valorObtido = leilao.Lances.Count();

            Assert.Equal(valorEsperado, valorObtido);

        }
    }
}
