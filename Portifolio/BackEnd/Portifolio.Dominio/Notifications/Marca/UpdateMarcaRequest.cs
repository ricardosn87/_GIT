﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Notifications.Marca
{
    public class UpdateMarcaRequest
    {
        public int IdMarca { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public int IdEmpresa { get; set; }
    }
}
