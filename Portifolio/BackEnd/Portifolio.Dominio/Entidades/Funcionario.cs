using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Entidades
{
    public class Funcionario
    {
        public int IdFuncionario { get; set; }
        public string Cpf { get; set; }
        public string Senha { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime? DataBloqueio { get; set; }
        public bool Admin { get; set; }
        public string Email { get; set; }
        public int IdEmpresa { get; set; }
        public string Nome { get; set; }
        public bool Ativo { get; set; }
    }
}
