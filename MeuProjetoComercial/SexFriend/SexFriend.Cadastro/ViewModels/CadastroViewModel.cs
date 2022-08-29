using FluentValidation;
using SexFriend.Entities;
using System;

namespace SexFriend.Cadastro.ViewModels
{
    public class CadastroViewModel 
    {

        //public CadastroViewModel(string cpf, string nome, DateTime dataNascimento, string email, string senha, string estado, string cidade, string bairro)
        //{
        //    Cpf = cpf;
        //    Nome = nome;
        //    DataNascimento = dataNascimento;
        //    Email = email;
        //    Senha = senha;
        //    Estado = estado;
        //    Cidade = cidade;
        //    Bairro = bairro;     
        //}

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
