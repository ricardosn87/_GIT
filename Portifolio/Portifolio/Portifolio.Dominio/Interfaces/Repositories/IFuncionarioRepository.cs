using Portifolio.Dominio.DTOs.Funcionario;
using Portifolio.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Interfaces.Repositories
{
    public interface IFuncionarioRepository
    {
        void IncluirFuncionario(IncluirFuncionarioDTO incluitFuncionarioDTO);
        FuncionarioDTO GetFuncionarioByEmail(string email);
        FuncionarioDTO GetFuncionarioByCPF(string cpf);

        void UpdateEmployee(AtualizarFuncionarioDTO atualizarFuncionarioDTO);
    }
}
