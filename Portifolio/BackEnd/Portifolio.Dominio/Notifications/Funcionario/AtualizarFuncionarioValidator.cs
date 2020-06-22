using FluentValidation;
using Portifolio.Dominio.DTOs.Funcionario;
using Portifolio.Dominio.Interfaces.Services;
using Portifolio.Dominio.Services;
using Portifolio.Util.Regex;
using Portifolio.Util.Validacoes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Funcionario
{
    public class AtualizarFuncionarioValidator : AbstractValidator<AtualizarFuncionarioDTO>
    {
        

        public AtualizarFuncionarioValidator()
        {
            

            RuleFor(v => v.CPF)
            .Must(Cpf => CPF.IsCpf(Cpf))
            .WithMessage("CPF Invalido.")
            .NotEmpty()
              .WithMessage("CPF Invalido.");

            RuleFor(v => v.Nome)
                   .NotEmpty()
                   .WithMessage("Nome Invalida.");

            RuleFor(v => v.Email)
                .Must(Cpf => Email.IsValidEmail(Cpf))
                .WithMessage("Email Invalida.")
                .NotEmpty()
                .WithMessage("Email Invalida.");
        }
    }
}
