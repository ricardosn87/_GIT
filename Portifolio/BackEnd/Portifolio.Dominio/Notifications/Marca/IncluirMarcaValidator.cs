using FluentValidation;
using Portifolio.Dominio.DTOs.Marca;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Marca
{
    public class IncluirMarcaValidator : AbstractValidator<IncluirMarcaDTO>
    {
        public IncluirMarcaValidator()
        {
            RuleFor(v => v.Nome)
                  .NotEmpty()
                  .WithMessage("Nome Invalida.");

            RuleFor(v => v.Descricao)
                  .NotEmpty()
                  .WithMessage("Descricao Invalida.");            
        }
    }
}
