using Portifolio.Data.Context;
using Portifolio.Dominio.DTOs.Usuario;
using Portifolio.Dominio.Entidades;
using Portifolio.Dominio.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Portifolio.Util.Validacoes;

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

                    if(r == null)
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
                    var r= db.Usuario.FirstOrDefault(x => x.Cpf == cpf);
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

        public Usuario Login(string email,string senha)
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

                    if(usuarioRecuperacaoSenha != null)
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
    }
}
