using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.Marca;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Marca
{
    public class IncluirMarcaDTO : Entity
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
       

        public IncluirMarcaDTO(string Nome, string Descricao, bool Ativo)
        {
            this.Nome = Nome;
            this.Descricao = Descricao;
            this.Ativo = Ativo;
            

            Validate(this, new IncluirMarcaValidator());
        }
    }
}
