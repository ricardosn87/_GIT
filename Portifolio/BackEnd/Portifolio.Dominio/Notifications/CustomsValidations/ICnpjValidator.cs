using System;
using System.Collections.Generic;
using System.Text;
using Portifolio.Util.Validacoes;

namespace Portifolio.Dominio.Notifications.CustomsValidations
{
    public interface ICnpjValidator
    {
        bool ValidaCNPJ(string CNPJ);
    }

    public class CnpjValidator : ICnpjValidator
    {
        public bool ValidaCNPJ(string cnpj)
        {
            return CNPJ.IsCnpj(cnpj);
        }
    }
}
