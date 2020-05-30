using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Entidades
{
    public class UsuarioRecuperacaoSenha
    {
        public int Id { get; set; }
        public string Cpf { get; set; }
        public string EmailHash { get; set; }
        public DateTime DataExpiracao { get; set; }
    }
}
