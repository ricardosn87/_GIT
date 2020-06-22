using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.Usuario;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Usuario
{
    public class FilterGetAllEmployeesDTO : Entity
    {
        public string EmailUsuario { get; set; }
        public string Cnpj { get; set; }
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

        public FilterGetAllEmployeesDTO(string EmailUsuario,
                                         string Cpnj,
                                         string RazaoSocial,
                                         string NomeFantasia,
                                         bool? Ativo,
                                         string Cpf,
                                         DateTime? DataCadastro,
                                         DateTime? DataBloqueio,
                                         bool? Admin,
                                         string EmailFuncionario,
                                         string NomeFuncionario,
                                         bool? FuncionarioAtivo)
        {
            this.EmailUsuario = EmailUsuario;
            this.EmailFuncionario = EmailFuncionario;
            this.Cnpj = Cpnj;
            this.RazaoSocial = RazaoSocial;
            this.NomeFantasia = NomeFantasia;
            this.Ativo = Ativo;
            this.Cpf = Cpf;
            this.DataCadastro = DataCadastro;
            this.DataBloqueio = DataBloqueio;
            this.Admin = Admin;
            this.EmailFuncionario = EmailFuncionario;
            this.NomeFuncionario = NomeFuncionario;
            this.FuncionarioAtivo = FuncionarioAtivo;

            Validate(this, new FilterGetAllEmployeesValidador());
        }
    }
}
