using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.Empresa;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Empresa
{
    public class IncluirEmpresaDTO : Entity
    {     
        public string Cnpj { get; set; }
        public string RazaoSocial { get; set; }
        public string NomeFantasia { get; set; }

        public IncluirEmpresaDTO(string Cnpj, string RazaoSocial, string NomeFantasia)
        {
            this.Cnpj = Cnpj;
            this.RazaoSocial = RazaoSocial;
            this.NomeFantasia = NomeFantasia;

            Validate(this, new IncluirEmpresaValidator());
        }
    }
}
