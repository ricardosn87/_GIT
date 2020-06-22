using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Entidades
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Cpf { get; set; }
        public string Senha { get; set; }
        public DateTime DataCadastro { get; set; }       
        public bool Admin { get; set; }   
        public string Email { get; set; }
    }
}
