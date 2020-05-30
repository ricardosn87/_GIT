using System;
using System.Collections.Generic;
using System.Text;
using Portifolio.Util.Regex;

namespace Portifolio.Dominio.Notifications.CustomsValidations
{
    public interface IEmailValidator
    {
        bool ValidEmail(string email);
    }

    public class EmailValidator : IEmailValidator
    {        
        public bool ValidEmail(string email)
        {
            return  Email.IsValidEmail(email);
        }
    }
}
