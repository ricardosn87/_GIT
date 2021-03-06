﻿using Portifolio.Dominio.DTOs.Usuario;
using Portifolio.Dominio.Entidades;
using Portifolio.Dominio.Notifications.Usuario;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Interfaces.Services
{
    public interface IUsuarioService
    {
        void CadastrarUsuario(IncluirUsuarioDTO incluirUsuarioDTO);
        bool UsuarioEmailExiste(string email);

        string GetCpf(string cpf);

        string GetEmail(string email);

        Usuario Login(string email, string senha);

        bool RecuperarSenha(string email, string assunto, string mensagem);

        string SaveLifeTimeRecuperaSenha(string email);

        void MudarSenha(MudarSenhaDTO mudarSenhaDTO);

        List<EmpresaFuncionarioDTO> FilterGetAllEmployees(FilterGetAllEmployeesDTO filterGetAllEmployeesDTO);

    }
}
