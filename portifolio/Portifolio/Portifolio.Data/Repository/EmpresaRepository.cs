using Portifolio.Data.Context;
using Portifolio.Dominio.DTOs.Empresa;
using Portifolio.Dominio.Entidades;
using Portifolio.Dominio.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Portifolio.Data.Repository
{
    public class EmpresaRepository : IEmpresaRepository
    {

        public Empresa IncluirEmpresa(IncluirEmpresaDTO incluirEmpresaDTO)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var novaEmpresa = new Empresa()
                    {
                        Cnpj = incluirEmpresaDTO.Cnpj,
                        NomeFantasia = incluirEmpresaDTO.NomeFantasia,
                        RazaoSocial = incluirEmpresaDTO.RazaoSocial
                    };

                    db.Empresa.Add(novaEmpresa);
                    db.SaveChanges();

                    return db.Empresa.FirstOrDefault(x => x.Cnpj == incluirEmpresaDTO.Cnpj);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public Empresa GetByCNPJ(string cnpj)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    return db.Empresa.FirstOrDefault(x => x.Cnpj == cnpj);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void SaveUsuarioEmpresa(string email, string cnpj)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var UusuarioEmpresa = new UsuarioEmpresa()
                    {
                        IdEmpresa = db.Empresa.FirstOrDefault(x => x.Cnpj == cnpj).IdEmpresa,
                        IdUsuario = db.Usuario.FirstOrDefault(x => x.Email == email).Id
                    };

                    db.UsuarioEmpresa.Add(UusuarioEmpresa);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Empresa> GetAllEmpresaByEmail(string email)
        {
            var ListaEmpresa = new List<Empresa>();
            try
            {
                using (var db = new PortifolioContext())
                {
                    var empresas = (from u in db.Usuario
                                   join ue in db.UsuarioEmpresa on u.Id equals ue.IdUsuario
                                   join e in db.Empresa on ue.IdEmpresa equals e.IdEmpresa
                                   where u.Email == email
                                   select new
                                   {
                                       e.IdEmpresa,
                                       e.Cnpj,
                                       e.RazaoSocial,
                                       e.NomeFantasia
                                   }).ToList();

                    foreach(var d in empresas)
                    {
                        var empresa = new Empresa();
                        empresa.IdEmpresa = d.IdEmpresa;
                        empresa.Cnpj = d.Cnpj;
                        empresa.RazaoSocial = d.RazaoSocial;
                        empresa.NomeFantasia = d.NomeFantasia;
                        ListaEmpresa.Add(empresa);
                    }

                    return ListaEmpresa;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool ChangeEmploy(AlterarEmpresaDTO alterarEmpresaDTO)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var d = db.Empresa.FirstOrDefault(x => x.Cnpj == alterarEmpresaDTO.Cnpj);
                    d.RazaoSocial = alterarEmpresaDTO.RazaoSocial;
                    d.NomeFantasia = alterarEmpresaDTO.NomeFantasia;

                    db.SaveChanges();

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
