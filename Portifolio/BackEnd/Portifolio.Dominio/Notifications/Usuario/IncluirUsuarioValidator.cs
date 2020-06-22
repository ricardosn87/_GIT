using Autofac;
using FluentValidation;
using Portifolio.Dominio.DTOs.Usuario;
using Portifolio.Dominio.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Usuario
{
    public class IncluirUsuarioValidator : AbstractValidator<IncluirUsuarioDTO>
    {
        public IncluirUsuarioValidator()
        {

            RuleFor(v => v.Cpf)
                .Must(cpf => Util.Validacoes.CPF.IsCpf(cpf))
                .WithMessage("CPF Invalido.");

            RuleFor(v => v.Senha)
               .NotEmpty()            
               .Length(5, 8)
               .WithMessage("Senha Invalida.");

            RuleFor(v => v.Email)
              .Must(email => Util.Regex.Email.IsValidEmail(email))
              .WithMessage("Email Invalido.");            
        }
    }
}
