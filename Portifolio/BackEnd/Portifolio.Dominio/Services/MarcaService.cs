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

        public MarcaDTO GetMarcaByNome(string nome)
        {
            return _iMarcaRepository.GetMarcaByNome(nome);
        }

        public List<MarcaDTO> GetMarcaByEmailUser(string email)
        {
            return _iMarcaRepository.GetMarcaByEmailUser(email);
        }

        public void UpdateMarca(UpdateMarcaDTO updateMarcaDTO)
        {
            _iMarcaRepository.UpdateMarca(updateMarcaDTO);
        }
    }
}
