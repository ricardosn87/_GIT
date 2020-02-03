using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetaGloboDevTest.DTOs
{
    public class ContatoUpdateDTO
    {
        public int ContatoId { get; set; }

        public string Nome { get; set; }


        public string TipoCanal { get; set; }


        public string Valor { get; set; }


        public string Observacao { get; set; }
    }
}
