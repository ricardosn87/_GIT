using FluentValidation;
using Portifolio.Dominio.DTOs.Empresa;
using Portifolio.Util.Validacoes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Empresa
{
    public class IncluirEmpresaValidator : AbstractValidator<IncluirEmpresaDTO>
    {
        public IncluirEmpresaValidator()
        {
            RuleFor(v => v.Cnpj)
            .Must(cnpj => CNPJ.IsCnpj(cnpj))
            .WithMessage("CPF Invalido.")
            .NotEmpty()
                   .WithMessage("CPF Invalido..");

            RuleFor(v => v.NomeFantasia)
                   .NotEmpty()
                   .WithMessage("NomeFantasia Invalida.");

            RuleFor(v => v.RazaoSocial)
                 .NotEmpty()
                 .WithMessage("RazaoSocial Invalida.");
         
        }
    }
}
