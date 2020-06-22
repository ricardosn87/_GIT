using Portifolio.Dominio.DTOs.Marca;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Interfaces.Repositories
{
    public interface IMarcaRepository
    {
        void SaveMarca(IncluirMarcaDTO incluirMarcaDTO);
        bool GetExistMarcaByNome(string nome);
    }
}
