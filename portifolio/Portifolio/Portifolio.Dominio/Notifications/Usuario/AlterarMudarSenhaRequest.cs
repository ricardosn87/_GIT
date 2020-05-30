using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Usuario
{
    public class AlterarMudarSenhaRequest
    {
        public string Key { get; set; }
        public string Senha { get; set; }
        public string Cpf { get; set; }
    }
}
