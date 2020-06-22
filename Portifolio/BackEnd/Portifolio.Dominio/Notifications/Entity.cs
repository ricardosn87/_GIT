using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;

using System.Text;

namespace Portifolio.Dominio.Notifications
{
    public abstract class Entity
    {
		public Guid Id { get; protected set; }
		public bool Valid { get; private set; }
		public bool Invalid => !Valid;
		public ValidationResult ValidationResult { get; private set; }

		public bool Validate<TModel>(TModel model, AbstractValidator<TModel> validator)
		{
			ValidationResult = validator.Validate(model);
			return Valid = ValidationResult.IsValid;
		}
	}
}
