using MetaGloboDevTest.Validations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MetaGloboDevTest.Models
{
    [Table("Contatos")]
    public class Contato
    {
        [Key]
        public int ContatoId { get; set; }

        [Required]       
        [StringLength(80, ErrorMessage ="Nome maximo 80 caracteres.")]
        public string Nome { get; set; }

        [Required]
        public string TipoCanal { get; set; }

        [Required]
        public string Valor { get; set; }

       
        [ValidationObservacao]
        public string Observacao { get; set; }
    }
}
