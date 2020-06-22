using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Funcionario
{
    public class AtualizarFuncionarioRequest
    {
        public string CPF { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public int IdEmpresa { get; set; }
    }
}
