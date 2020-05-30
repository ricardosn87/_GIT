using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Entidades
{
    public class Empresa
    {
        public int IdEmpresa { get; set; }
        public string Cnpj { get; set; }
        public string RazaoSocial { get; set; }
        public string NomeFantasia { get; set; }
    }
}
