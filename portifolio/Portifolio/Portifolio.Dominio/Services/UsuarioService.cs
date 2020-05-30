using Portifolio.Dominio.DTOs.Usuario;
using Portifolio.Dominio.Entidades;
using Portifolio.Dominio.Interfaces.Repositories;
using Portifolio.Dominio.Interfaces.Services;
using Portifolio.Util.Email;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Services
{
    public class UsuarioService : IUsuarioService
    {

        private readonly IUsuarioRepository _usuarioRepository;

        private readonly IEmailSender _emailSender;

        public UsuarioService(IUsuarioRepository usuarioRepository, IEmailSender emailSender)
        {
            _usuarioRepository = usuarioRepository;
            _emailSender = emailSender;
        }

        public void CadastrarUsuario(IncluirUsuarioDTO incluirUsuarioDTO)
        {
            _usuarioRepository.CadastrarUsuario(incluirUsuarioDTO);
        }

        public bool UsuarioEmailExiste(string email)
        {
            return _usuarioRepository.UsuarioEmailExiste(email);
        }

        public string GetCpf(string cpf)
        {
            return _usuarioRepository.GetCpf(cpf);
        }

        public string GetEmail(string email)
        {
            return _usuarioRepository.GetEmail(email);
        }

        public Usuario Login(string email, string senha)
        {
            return _usuarioRepository.Login(email, senha);
        }

        public bool RecuperarSenha(string email, string assunto, string mensagem)
        {
            return _emailSender.SendEmail(email, assunto, mensagem);
        }

        public string SaveLifeTimeRecuperaSenha(string email)
        {
            return _usuarioRepository.SaveLifeTimeRecuperaSenha(email);
        }

        public void MudarSenha(MudarSenhaDTO mudarSenhaDTO)
        {
            _usuarioRepository.MudarSenha(mudarSenhaDTO);
        }
    }
}
