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
                        Ativo = incluirMarcaDTO.Ativo,
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

        public bool GetExistMarcaByNome(string nome)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var m = db.Marca.FirstOrDefault(x => x.Nome.Trim() == nome.Trim());
                    if(m == null)
                    {
                        return false;
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
