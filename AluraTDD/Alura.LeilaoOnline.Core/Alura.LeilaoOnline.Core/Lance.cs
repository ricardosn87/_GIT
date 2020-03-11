using System;
using System.Collections.Generic;
using System.Text;

namespace Alura.LeilaoOnline.Core
{
    public class Lance
    {
        public Interessada Cliente { get; }
        public double Valor { get; }

        public Lance(Interessada cliente, double valor)
        {

            if(valor < 0)
            {
                throw new ArgumentException("Valor nao pode ser nagtivo.");
            }
            Cliente = cliente;
            Valor = valor;
        }
    }
}
