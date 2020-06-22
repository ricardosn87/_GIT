﻿using Portifolio.Dominio.DTOs.Funcionario;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Usuario
{
    public class EmpresaFuncionarioDTO
    {
        public int IdEmpresa { get; set; }
        public string Cnpj { get; set; }
        public string RazaoSocial { get; set; }
        public string NomeFantasia { get; set; }

        public List<FuncionarioDTO> FuncionarioDTOs { get; set; }
    }
}
