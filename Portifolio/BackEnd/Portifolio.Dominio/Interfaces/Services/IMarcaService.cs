using Portifolio.Dominio.DTOs.Marca;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Interfaces.Services
{
    public interface IMarcaService
    {
        void SaveMarca(IncluirMarcaDTO incluirMarcaDTO);
        MarcaDTO GetMarcaByNome(string nome);
    }
}
