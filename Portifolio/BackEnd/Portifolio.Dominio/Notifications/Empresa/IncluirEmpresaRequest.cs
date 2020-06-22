using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Empresa
{
    public class IncluirEmpresaRequest
    {
        public string Cnpj { get; set; }
        public string RazaoSocial { get; set; }
        public string NomeFantasia { get; set; }
    }
}
