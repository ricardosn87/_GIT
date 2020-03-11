using Alura.LeilaoOnline.Core;
using System;

namespace Alura.LeilaoOnline.ConsoleApp
{
    class Program
    {

        private static void Verifica(double esperado, double obtido)
        {
            if(esperado == obtido)
            {
                Console.WriteLine("Teste OK");
            }
            else
            {
                Console.WriteLine("Teste Nao OK");
            }
        }
        private static void LeilaoComVariosLances()
        {
            var modalidade = new MaiorValor();
            var leilao = new Leilao("Van Gogh", modalidade);
            var fulano = new Interessada("Fulano", leilao);
            var maria = new Interessada("Maria", leilao);

            leilao.RecebeLance(fulano, 800);
            leilao.RecebeLance(maria, 800);
            leilao.RecebeLance(fulano, 1000);

            leilao.RecebeLance(maria, 500);

            leilao.TerminaPregao();

            var valorEsperado = 1000;
            var valorObtido = leilao.Ganhador.Valor;

            Verifica(valorEsperado, valorObtido);

            Console.WriteLine(leilao.Ganhador.Valor);
        }

        private static void LeilaoComApenasUmLances()
        {
            var modalidade = new MaiorValor();
            var leilao = new Leilao("Van Gogh", modalidade);
            var fulano = new Interessada("Fulano", leilao);

            leilao.RecebeLance(fulano, 800);

            leilao.TerminaPregao();

            var valorEsperado = 800;
            var valorObtido = leilao.Ganhador.Valor;

            Verifica(valorEsperado, valorObtido);
            Console.WriteLine(leilao.Ganhador.Valor);
        }

        static void Main(string[] args)
        {
            LeilaoComVariosLances();
            LeilaoComApenasUmLances();
                
        }       
    }
}
