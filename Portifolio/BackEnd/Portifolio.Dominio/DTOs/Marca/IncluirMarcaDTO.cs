using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.CustomsValidations;
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
        public int IdEmpresa { get; set; }       


        public IncluirMarcaDTO(string Nome, string Descricao, int IdEmpresa)
        {
            this.Nome = Nome;
            this.Descricao = Descricao;
            this.IdEmpresa = IdEmpresa;


            Validate(this, new IncluirMarcaValidator());
        }
    }
}
