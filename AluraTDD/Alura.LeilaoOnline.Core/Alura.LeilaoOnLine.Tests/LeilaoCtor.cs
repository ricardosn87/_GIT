using Alura.LeilaoOnline.Core;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Alura.LeilaoOnLine.Tests
{
    public class LeilaoCtor
    {
        [Fact]
        public void LancaArgumentExceptionDadoValorNegativo()
        {
            var valorNegativo = -100;

            var r = Assert.Throws<ArgumentException>(
                 () => new Lance(null, valorNegativo)
                 );

            Assert.Equal("Valor nao pode ser nagtivo.", r.Message);
        }
    }
}
