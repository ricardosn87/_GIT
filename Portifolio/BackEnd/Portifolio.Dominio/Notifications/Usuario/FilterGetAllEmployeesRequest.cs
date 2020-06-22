using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Usuario
{
    public class FilterGetAllEmployeesRequest
    {
        public string EmailUsuario { get; set; }
        public string Cpnj { get; set; }
        public string RazaoSocial { get; set; }
        public string NomeFantasia { get; set; }
        public bool? Ativo { get; set; }
        public string Cpf { get; set; }
        public DateTime? DataCadastro { get; set; }
        public DateTime? DataBloqueio { get; set; }
        public bool? Admin { get; set; }
        public string EmailFuncionario { get; set; }
        public string NomeFuncionario { get; set; }
        public bool? FuncionarioAtivo { get; set; }
    }
}
