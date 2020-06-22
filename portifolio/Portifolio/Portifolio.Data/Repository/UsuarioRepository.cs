using Portifolio.Data.Context;
using Portifolio.Dominio.DTOs.Usuario;
using Portifolio.Dominio.Entidades;
using Portifolio.Dominio.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Portifolio.Util.Validacoes;
using Portifolio.Dominio.DTOs.Funcionario;
using Portifolio.Dominio.Notifications.Usuario;

namespace Portifolio.Data.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {

        public void CadastrarUsuario(IncluirUsuarioDTO incluirUsuarioDTO)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var novoUsuario = new Usuario()
                    {
                        Admin = true,
                        DataCadastro = DateTime.Now,
                        Cpf = incluirUsuarioDTO.Cpf,
                        Senha = Criptografia.CalculaHash(incluirUsuarioDTO.Senha),
                        Email = incluirUsuarioDTO.Email
                    };

                    db.Usuario.Add(novoUsuario);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool UsuarioEmailExiste(string email)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var r = db.Usuario.FirstOrDefault(x => x.Email == email);

                    if (r == null)
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

        public string GetCpf(string cpf)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var r = db.Usuario.FirstOrDefault(x => x.Cpf == cpf);
                    if (r == null)
                    {
                        return null;
                    }
                    else
                    {
                        return r.Cpf;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetEmail(string email)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var r = db.Usuario.FirstOrDefault(x => x.Email == email);
                    if (r == null)
                    {
                        return null;
                    }
                    else
                    {
                        return r.Email;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Usuario Login(string email, string senha)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var r = db.Usuario.FirstOrDefault(x => x.Email == email && x.Senha == Criptografia.CalculaHash(senha));
                    if (r == null)
                    {
                        return null;
                    }
                    else
                    {
                        return r;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string SaveLifeTimeRecuperaSenha(string email)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var r = db.Usuario.FirstOrDefault(x => x.Email == email);
                    UsuarioRecuperacaoSenha usuarioRecuperaSenha = new UsuarioRecuperacaoSenha();
                    usuarioRecuperaSenha.Cpf = r.Cpf;
                    usuarioRecuperaSenha.EmailHash = Criptografia.CalculaHash(email);
                    usuarioRecuperaSenha.DataExpiracao = DateTime.Now.AddHours(24);

                    db.UsuarioRecuperacaoSenha.Add(usuarioRecuperaSenha);
                    db.SaveChanges();

                    return usuarioRecuperaSenha.EmailHash;

                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void MudarSenha(MudarSenhaDTO mudarSenhaDTO)
        {
            UsuarioRecuperacaoSenha usuarioRecuperacaoSenha = new UsuarioRecuperacaoSenha();
            try
            {
                using (var db = new PortifolioContext())
                {
                    usuarioRecuperacaoSenha = db.UsuarioRecuperacaoSenha.FirstOrDefault(x => x.Cpf == mudarSenhaDTO.Cpf && x.EmailHash == mudarSenhaDTO.Key && x.DataExpiracao > DateTime.Now);

                    if (usuarioRecuperacaoSenha != null)
                    {
                        Usuario usuario = db.Usuario.FirstOrDefault(x => x.Cpf == usuarioRecuperacaoSenha.Cpf);
                        usuario.Senha = Criptografia.CalculaHash(mudarSenhaDTO.Senha);
                        db.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<EmpresaFuncionarioDTO> FilterGetAllEmployees(FilterGetAllEmployeesDTO filterGetAllEmployeesDTO)
        {
            var ListaEmpresaFuncionarioDTO = new List<EmpresaFuncionarioDTO>();

            try
            {
                using (var db = new PortifolioContext())
                {
                    var dados = (from u in db.Usuario
                                 join ue in db.UsuarioEmpresa on u.Id equals ue.IdUsuario
                                 join e in db.Empresa on ue.IdEmpresa equals e.IdEmpresa
                                 join f in db.Funcionario on ue.IdEmpresa equals f.IdEmpresa
                                 where u.Email == filterGetAllEmployeesDTO.EmailUsuario
                                 select new
                                 {
                                     IdEmpresa = ue.IdEmpresa,
                                     Cnpj = e.Cnpj,
                                     RazaoSocial = e.RazaoSocial,
                                     NomeFantasia = e.NomeFantasia,
                                     IdFuncionario = f.IdFuncionario,
                                     Cpf = f.Cpf,
                                     DataCadastro = f.DataCadastro,
                                     DataBloqueio = f.DataBloqueio,
                                     Admin = f.Admin,
                                     Email = f.Email,
                                     IdEmpresaFuncionario = f.IdEmpresa,
                                     Nome = f.Nome,
                                     Ativo = f.Ativo
                                 });

                    if(filterGetAllEmployeesDTO.Cpf != null)
                    {
                        dados = dados.Where(x => x.Cpf == filterGetAllEmployeesDTO.Cpf);
                    }

                    if (filterGetAllEmployeesDTO.Cnpj != null)
                    {
                        dados = dados.Where(x => x.Cnpj == filterGetAllEmployeesDTO.Cnpj);
                    }

                    if (filterGetAllEmployeesDTO.RazaoSocial != null)
                    {
                        dados = dados.Where(x => x.RazaoSocial == filterGetAllEmployeesDTO.RazaoSocial);
                    }

                    if (filterGetAllEmployeesDTO.NomeFantasia != null)
                    {
                        dados = dados.Where(x => x.NomeFantasia == filterGetAllEmployeesDTO.NomeFantasia);
                    }
                    if (filterGetAllEmployeesDTO.DataCadastro != null)
                    {
                        dados = dados.Where(x => x.DataCadastro == filterGetAllEmployeesDTO.DataCadastro);
                    }
                    if (filterGetAllEmployeesDTO.DataBloqueio != null)
                    {
                        dados = dados.Where(x => x.DataBloqueio == filterGetAllEmployeesDTO.DataBloqueio);
                    }
                    if (filterGetAllEmployeesDTO.Admin != null)
                    {
                        dados = dados.Where(x => x.Admin == filterGetAllEmployeesDTO.Admin);
                    }
                    if (filterGetAllEmployeesDTO.EmailFuncionario != null)
                    {
                        dados = dados.Where(x => x.Email == filterGetAllEmployeesDTO.EmailFuncionario);
                    }
                    if (filterGetAllEmployeesDTO.NomeFuncionario != null)
                    {
                        dados = dados.Where(x => x.Nome == filterGetAllEmployeesDTO.NomeFuncionario);
                    }
                    if (filterGetAllEmployeesDTO.Ativo != null)
                    {
                        dados = dados.Where(x => x.Ativo == filterGetAllEmployeesDTO.Ativo);
                    }

                    foreach (var d in dados)
                    {
                        var empresaFuncionarioDTO = new EmpresaFuncionarioDTO();
                        empresaFuncionarioDTO.IdEmpresa = d.IdEmpresa;
                        empresaFuncionarioDTO.Cnpj = d.Cnpj;
                        empresaFuncionarioDTO.RazaoSocial = d.RazaoSocial;
                        empresaFuncionarioDTO.NomeFantasia = d.NomeFantasia;

                        var funcionarioDTO = new FuncionarioDTO();
                        funcionarioDTO.IdEmpresa = d.IdEmpresaFuncionario;
                        funcionarioDTO.Cpf = d.Cpf;
                        funcionarioDTO.DataCadastro = d.DataCadastro;
                        funcionarioDTO.DataBloqueio = d.DataBloqueio;
                        funcionarioDTO.Admin = d.Admin;
                        funcionarioDTO.Email = d.Email;
                        funcionarioDTO.Nome = d.Nome;
                        funcionarioDTO.Ativo = d.Ativo;

                        empresaFuncionarioDTO.FuncionarioDTOs = new List<FuncionarioDTO>();
                        empresaFuncionarioDTO.FuncionarioDTOs.Add(funcionarioDTO);

                        ListaEmpresaFuncionarioDTO.Add(empresaFuncionarioDTO);
                    }
                }
                return ListaEmpresaFuncionarioDTO.OrderBy(x => x.IdEmpresa).OrderBy(x => x.NomeFantasia).ToList(); 
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
