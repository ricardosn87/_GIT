using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.Funcionario;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Funcionario
{
    public class AtualizarFuncionarioDTO : Entity
    {
        public string CPF { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public int IdEmpresa { get; set; }

        public AtualizarFuncionarioDTO(string CPF, string Nome, string Email, int IdEmpresa)
        {
            this.CPF = CPF;
            this.Nome = Nome;
            this.Email = Email;
            this.IdEmpresa = IdEmpresa;

            Validate(this, new AtualizarFuncionarioValidator());
        }
    }
}
