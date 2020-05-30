using Autofac;
using Portifolio.Dominio.Interfaces.Repositories;
using Portifolio.Dominio.Interfaces.Services;
using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.Usuario;
using Portifolio.Dominio.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Usuario
{
    public class IncluirUsuarioDTO : Entity
    {

        public string Cpf { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }

        public IncluirUsuarioDTO(string _Cpf, string _Email, string _Senha)
        {
            this.Cpf = _Cpf;
            this.Email = _Email;
            this.Senha = _Senha;

            Validate(this, new IncluirUsuarioValidator());
        }
    }
}
