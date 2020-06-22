using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Empresa
{
    public class EmpresaDTO
    {
        public int IdEmpresa { get; set; }
        public string Cnpj { get; set; }
        public string RazaoSocial { get; set; }
        public string NomeFantasia { get; set; }
    }
}
