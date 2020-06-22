using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.Funcionario;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Funcionario
{
    public class IncluirFuncionarioDTO : Entity
    {       
        public string Cpf { get; set; }
        public string Senha { get; set; }              
        public string Email { get; set; }       
        public string Nome { get; set; }
        public int IdEmpresa { get; set; }

        public IncluirFuncionarioDTO(string Cpf, string Senha, string Email, string Nome, int IdEmpresa)
        {
            this.Cpf = Cpf;
            this.Senha = Senha;          
            this.Email = Email;
            this.Nome = Nome;
            this.IdEmpresa = IdEmpresa;

            Validate(this, new IncluirFuncionarioValidator());
        }
    }
}
