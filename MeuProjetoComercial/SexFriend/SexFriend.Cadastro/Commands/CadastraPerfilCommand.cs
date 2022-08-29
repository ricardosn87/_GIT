using FluentValidation;
using FluentValidation.Results;
using MediatR;
using SexFriend.Entities;
using SexFriend.System.Commands;
using System;

namespace SexFriend.Cadastro.Commands
{
    public class CadastraPerfilCommand : Command
    {
        public string Cpf { get; set; }

        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }

        public string Estado { get; set; }

        public string Cidade { get; set; }

        public string Bairro { get; set; }


        public override bool EhValido()
        {
            ValidationResult = new CadastraPerfilValidator().Validate(this);
            return ValidationResult.IsValid;
        }

        public class CadastraPerfilValidator : AbstractValidator<CadastraPerfilCommand>
        {
            public CadastraPerfilValidator()
            {
                RuleFor(x => x.Cpf).NotEmpty().WithMessage("Cpf não pode ser vazio.");

                RuleFor(x => x.Nome)
                .NotEmpty()
                .WithMessage("Nome não pode ser vazio.");

                RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("Email inválido.");

                RuleFor(x => x.Senha).NotEmpty().WithMessage("Senha não pode ser vazio.");

                RuleFor(x => x.DataNascimento).NotEmpty().WithMessage("Data Nascimento não pode ser vazio.");

                RuleFor(x => x.Estado).NotEmpty().WithMessage("Estado não pode ser vazio.");

                RuleFor(x => x.Cidade).NotEmpty().WithMessage("Cidade não pode ser vazio.");

                RuleFor(x => x.Bairro).NotEmpty().WithMessage("Bairro não pode ser vazio.");

            }
        }

    }

   
}
