using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.Usuario;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Usuario
{
    public class MudarSenhaDTO : Entity
    {
        public string Key { get; set; }
        public string Senha { get; set; }
        public string Cpf { get; set; }

        public MudarSenhaDTO(string Key, string Senha, string Cpf)
        {
            this.Key = Key;
            this.Senha = Senha;
            this.Cpf = Cpf;

            Validate(this, new AlterarMudarSenhaValidator());
        }
    }
}
