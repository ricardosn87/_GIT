using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SexFriend.Entities.Cadastro
{
    public class TipoSeguimentoSexualEntity
    {
        [Key]
        public int IdTipoSeguimentoSexual { get; set; }

        public string Descricao { get; set; }

    }
}
