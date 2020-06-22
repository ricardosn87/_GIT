using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using Portifolio.Dominio.DTOs.Usuario;

namespace Portifolio.Dominio.Notifications.Usuario
{
    public class AlterarMudarSenhaValidator : AbstractValidator<MudarSenhaDTO>
    {
        public AlterarMudarSenhaValidator()
        {
            RuleFor(v => v.Cpf)
               .Must(cpf => Util.Validacoes.CPF.IsCpf(cpf))
               .WithMessage("CPF Invalido.");

            RuleFor(v => v.Senha)
               .NotEmpty()
               .Length(5, 8)
               .WithMessage("Senha Invalida.");
        }
    }
}
