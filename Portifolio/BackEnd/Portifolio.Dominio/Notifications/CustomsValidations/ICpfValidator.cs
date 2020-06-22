using Portifolio.Util.Validacoes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.CustomsValidations
{
    public interface ICpfValidator
    {
        bool ValidCpf(string cpf);
    }

    public class CpfValidator : ICpfValidator
    {
        public bool ValidCpf(string cpf)
        {
            return CPF.IsCpf(cpf);
        }
    }
}
