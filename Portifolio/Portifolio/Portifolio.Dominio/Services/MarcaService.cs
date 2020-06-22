using Portifolio.Dominio.DTOs.Marca;
using Portifolio.Dominio.Interfaces.Repositories;
using Portifolio.Dominio.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Services
{
    public class MarcaService : IMarcaService
    {
        private readonly IMarcaRepository _iMarcaRepository;
        public MarcaService(IMarcaRepository iMarcaRepository)
        {
            _iMarcaRepository = iMarcaRepository;
        }

        public void SaveMarca(IncluirMarcaDTO incluirMarcaDTO)
        {
            _iMarcaRepository.SaveMarca(incluirMarcaDTO);
        }

        public bool GetExistMarcaByNome(string nome)
        {
            return _iMarcaRepository.GetExistMarcaByNome(nome);
        }
    }
}
