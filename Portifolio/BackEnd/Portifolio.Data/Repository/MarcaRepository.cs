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
                    if (m == null)
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

        public List<MarcaDTO> GetMarcaByEmailUser(string email)
        {
            try
            {
                var listaMarcasDTO = new List<MarcaDTO>();
                using (var db = new PortifolioContext())
                {
                    var userCompany = db.Usuario.FirstOrDefault(x => x.Email == email);
                    var listIdEmpresa = db.UsuarioEmpresa.Where(x => x.IdUsuario == userCompany.Id).Select(s => s.IdEmpresa);


                    var listaMarcas = db.Marca.Where(x => listIdEmpresa.Contains(x.IdEmpresa)).ToList();

                    foreach (var d in listaMarcas)
                    {
                        var marcaDTO = new MarcaDTO();
                        marcaDTO.IdMarca = d.IdMarca;
                        marcaDTO.Nome = d.Nome;
                        marcaDTO.Descricao = d.Descricao;
                        marcaDTO.Ativo = d.Ativo;
                        marcaDTO.IdEmpresa = d.IdEmpresa;
                        marcaDTO.NomeEmpresa = db.Empresa.FirstOrDefault(x => x.IdEmpresa == d.IdEmpresa).RazaoSocial;
                        listaMarcasDTO.Add(marcaDTO);
                    }


                    return listaMarcasDTO;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void UpdateMarca(UpdateMarcaDTO updateMarcaDTO)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var marca = db.Marca.FirstOrDefault(x => x.IdMarca == updateMarcaDTO.IdMarca);
                    marca.Ativo = true;
                    marca.Descricao = updateMarcaDTO.Descricao;
                    marca.IdEmpresa = updateMarcaDTO.IdEmpresa;
                    marca.Nome = updateMarcaDTO.Nome;
                    db.SaveChanges();

                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
