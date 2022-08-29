

using FluentValidation;
using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace SexFriend.Entities
{
    public class PerfilEntity 
    {
        public PerfilEntity(string cpf, string nome, DateTime dataNascimento, string email, string senha, string estado, string cidade, string bairro)
        {
            Cpf = cpf;
            Nome = nome;
            DataNascimento = dataNascimento;
            Email = email;
            Senha = senha;
            Estado = estado;
            Cidade = cidade;
            Bairro = bairro;
        }

        [Key]
        public int IdPerfil { get; set; }
        public string Cpf { get; set; }

        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }

        public string Estado { get; set; }

        public string Cidade { get; set; }

        public string Bairro { get; set; }
       
    }

    
}
