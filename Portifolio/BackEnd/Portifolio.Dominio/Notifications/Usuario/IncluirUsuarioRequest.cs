using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Usuario
{
    public class IncluirUsuarioRequest
    {

        public string Cpf { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }        
    }
}
