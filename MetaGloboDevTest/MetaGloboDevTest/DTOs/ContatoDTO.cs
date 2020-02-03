using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MetaGloboDevTest.DTOs
{
    public class ContatoDTO
    {
        
        public int ContatoId { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string TipoCanal { get; set; }

        [Required]
        public string Valor { get; set; }

      
        public string Observacao { get; set; }
    }
}
