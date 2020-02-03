using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MetaGloboDevTest.Validations
{
    public class ValidationObservacao : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString().Length > 300)
            {
                return new ValidationResult("A obervacao devera conter no maximo 300 caracteres.");
            }
            return ValidationResult.Success;
        }
    }
}
