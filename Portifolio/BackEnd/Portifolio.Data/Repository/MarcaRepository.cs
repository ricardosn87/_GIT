using AutoMapper;
using Portifolio.Data.Context;
using Portifolio.Dominio.DTOs.Marca;
using Portifolio.Dominio.Entidades;
using Portifolio.Dominio.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Portifolio.Data.Repository
{
    public class MarcaRepository : IMarcaRepository
    {
        private readonly IMapper _mapper;
        public MarcaRepository(IMapper mapper)
        {
            _mapper = mapper;
        }

        public void SaveMarca(IncluirMarcaDTO incluirMarcaDTO)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var novaMarcar = new Marca()
                    {
                        Nome = incluirMarcaDTO.Nome,
                        Descricao = incluirMarcaDTO.Descricao,
                        Ativo = true,
                        IdEmpresa = incluirMarcaDTO.IdEmpresa
                    };

                    db.Marca.Add(novaMarcar);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public MarcaDTO GetMarcaByNome(string nome)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var m = _mapper.Map<MarcaDTO>(db.Marca.FirstOrDefault(x => x.Nome.Trim() == nome.Trim()));
                    if(m == null)
                    {
                        return m;
                    }
                    return m;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
