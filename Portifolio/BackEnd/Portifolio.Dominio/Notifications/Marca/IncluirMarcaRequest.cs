using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Marca
{
    public class IncluirMarcaRequest
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
       
    }
}
