using FluentValidation;
using Portifolio.Dominio.DTOs.Funcionario;
using Portifolio.Util.Regex;
using Portifolio.Util.Validacoes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Funcionario
{
    public class IncluirFuncionarioValidator : AbstractValidator<IncluirFuncionarioDTO>
    {
        public IncluirFuncionarioValidator()
        {
            RuleFor(v => v.Cpf)
           .Must(Cpf => CPF.IsCpf(Cpf))
           .WithMessage("CPF Invalido.")
           .NotEmpty()
                  .WithMessage("CPF Invalido.");

            RuleFor(v => v.Nome)
                   .NotEmpty()
                   .WithMessage("Nome Invalido.");

            RuleFor(v => v.Email)
                .Must(Cpf => Email.IsValidEmail(Cpf))
                .WithMessage("Email Invalido.")
                .NotEmpty()
                .WithMessage("Email Invalido.");           

            RuleFor(v => v.Senha)
                  .NotEmpty()
                  .WithMessage("Senha Invalida.");            
        }
    }
}

