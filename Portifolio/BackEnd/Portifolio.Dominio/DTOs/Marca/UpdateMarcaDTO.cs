using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.Marca;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Marca
{
    public class UpdateMarcaDTO : Entity
    {
        public int IdMarca { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public int IdEmpresa { get; set; }


        public UpdateMarcaDTO(int IdMarca,string Nome, string Descricao, int IdEmpresa)
        {
            this.IdMarca = IdMarca;
            this.Nome = Nome;
            this.Descricao = Descricao;
            this.IdEmpresa = IdEmpresa;


            Validate(this, new UpdateMarcaValidator());
        }
    }
}
