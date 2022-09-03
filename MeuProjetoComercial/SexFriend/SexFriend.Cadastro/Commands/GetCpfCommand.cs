using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace SexFriend.Cadastro.Commands
{
    public class GetCpfCommand : IRequest<string>
    {
        public string Cpf { get; set; }
        public ValidationResult ValidationResult { get; private set; }

        public bool EhValido()
        {
            ValidationResult = new GetCpfValidator().Validate(this);
            return ValidationResult.IsValid;
        }

        public class GetCpfValidator : AbstractValidator<GetCpfCommand>
        {
            public GetCpfValidator()
            {
                RuleFor(x => x.Cpf).NotEmpty().WithMessage("Cpf não pode ser vazio.")
                     .IsValidCPF().WithMessage("Cpf inválido");
            }
        }
    }
}
