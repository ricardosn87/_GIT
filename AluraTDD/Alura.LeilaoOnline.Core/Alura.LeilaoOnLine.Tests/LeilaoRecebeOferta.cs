using Alura.LeilaoOnline.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace Alura.LeilaoOnLine.Tests
{
    public class LeilaoRecebeOferta
    {

        [Fact]
        public void NaoAceitaLancesProximoLanceDadoMesmoClienteRealizouUltimoLance()
        {
            var modalidade = new MaiorValor();
            var leilao = new Leilao("Van Gogh", modalidade);
            var fulano = new Interessada("Fulano", leilao);

            leilao.IniciaPregao();
           
            leilao.RecebeLance(fulano, 800);

            leilao.RecebeLance(fulano, 1000);

            var qtdEsperada = 1;
            var valorObtido = leilao.Lances.Count();

            Assert.Equal(qtdEsperada, valorObtido);
           
        }

        [Theory]
        [InlineData(4, new double[] { 1000,1200,1400,1300 })]
        [InlineData(2,new double[] { 800,900})]
        public void NaoPermiteNovosLancesDadoLeilaoFinalizado(
            int qtdEsperada, double[] ofertas)
        {
            var modalidade = new MaiorValor();
            var leilao = new Leilao("Van Gogh", modalidade);
            var fulano = new Interessada("Fulano", leilao);
            var maria = new Interessada("Maria", leilao);

            leilao.IniciaPregao();

            for(int i = 0; i< ofertas.Length; i++)
            {
                var valor = ofertas[i];
                if((i%2) == 0)
                {
                    leilao.RecebeLance(fulano, valor);
                }
                else
                {
                    leilao.RecebeLance(maria, valor);
                }
            }             

            leilao.TerminaPregao();

            leilao.RecebeLance(fulano, 1000);
           
            var valorObtido = leilao.Lances.Count();

            Assert.Equal(qtdEsperada, valorObtido);
            Console.WriteLine(leilao.Ganhador.Valor);
        }
    }
}
