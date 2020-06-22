using Portifolio.Dominio.DTOs.Funcionario;
using Portifolio.Dominio.Entidades;
using Portifolio.Dominio.Interfaces.Repositories;
using Portifolio.Dominio.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Services
{
    public class FuncionarioService : IFuncionarioService
    {
        private readonly IFuncionarioRepository funcionarioRepository;

        public FuncionarioService(IFuncionarioRepository _funcionarioRepository)
        {
            funcionarioRepository = _funcionarioRepository;
        }

        public void IncluirFuncionario(IncluirFuncionarioDTO incluitFuncionarioDTO)
        {
            funcionarioRepository.IncluirFuncionario(incluitFuncionarioDTO);
        }

        public FuncionarioDTO GetFuncionarioByEmail(string email)
        {
            return funcionarioRepository.GetFuncionarioByEmail(email);
        }

        public FuncionarioDTO GetFuncionarioByCPF(string cpf)
        {
            return funcionarioRepository.GetFuncionarioByCPF(cpf);
        }

        public void UpdateEmployee(AtualizarFuncionarioDTO atualizarFuncionarioDTO)
        {
            funcionarioRepository.UpdateEmployee(atualizarFuncionarioDTO);
        }
    }
}
