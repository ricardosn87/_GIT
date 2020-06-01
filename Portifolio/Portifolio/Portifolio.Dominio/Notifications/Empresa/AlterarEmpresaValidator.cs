using FluentValidation;
using Portifolio.Dominio.DTOs.Empresa;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Empresa
{
    public  class AlterarEmpresaValidator : AbstractValidator<AlterarEmpresaDTO>
    {
        public AlterarEmpresaValidator()
        {
            RuleFor(v => v.NomeFantasia)
                  .NotEmpty()
                  .WithMessage("NomeFantasia Invalida.");

            RuleFor(v => v.RazaoSocial)
                 .NotEmpty()
                 .WithMessage("RazaoSocial Invalida.");
        }
    }
}
