using FluentValidation;
using Portifolio.Dominio.DTOs.Usuario;
using Portifolio.Util.Validacoes;


namespace Portifolio.Dominio.Notifications.Usuario
{
    public class FilterGetAllEmployeesValidador : AbstractValidator<FilterGetAllEmployeesDTO>
    {
        public FilterGetAllEmployeesValidador()
        {
            RuleFor(v => v.EmailUsuario)
              .Must(email => Util.Regex.Email.IsValidEmail(email))
              .WithMessage("Email Usuario Invalido.");

            RuleFor(v => v.Cnpj)
           .Must(cnpj => cnpj == null || cnpj == "" ? true : CNPJ.IsCnpj(cnpj))
           .WithMessage("CNPJ Invalido.");

            RuleFor(v => v.Cpf)
               .Must(cpf => cpf == null || cpf == "" ? true : CPF.IsCpf(cpf))
               .WithMessage("CPF Invalido.");

            RuleFor(v => v.EmailFuncionario)
           .Must(email => email == null || email == "" ? true : Util.Regex.Email.IsValidEmail(email))
           .WithMessage("Email Funcionario.");
        }
    }
}
