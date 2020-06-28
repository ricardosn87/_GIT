using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.DTOs.Marca
{
    public class MarcaDTO
    {
        public int IdMarca { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
        public int IdEmpresa { get; set; }
    }
}
