using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Funcionario
{
    public class IncluirFuncionarioRequest
    {
        public string Cpf { get; set; }
        public string Senha { get; set; }
        public string Email { get; set; }
        public string Nome { get; set; }
        public int IdEmpresa { get; set; }
    }
}
