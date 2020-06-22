using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Portifolio.Data.Context;
using Portifolio.Dominio.DTOs.Funcionario;
using Portifolio.Dominio.Entidades;
using Portifolio.Dominio.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Portifolio.Data.Repository
{
    public class FuncionarioRepository : IFuncionarioRepository
    {
        private readonly IMapper _mapper;
        public FuncionarioRepository(IMapper mapper)
        {
            _mapper = mapper;
        }

        public void IncluirFuncionario(IncluirFuncionarioDTO incluitFuncionarioDTO)
        {
            try
            {
                using (var db = new PortifolioContext())
                {

                    var novoFuncionario = new Funcionario()
                    {
                        Cpf = incluitFuncionarioDTO.Cpf,
                        Senha = incluitFuncionarioDTO.Senha,
                        DataCadastro = DateTime.Now,
                        Admin = false,
                        Email = incluitFuncionarioDTO.Email,
                        IdEmpresa = incluitFuncionarioDTO.IdEmpresa,
                        Nome = incluitFuncionarioDTO.Nome,
                        Ativo = true
                    };
                    db.Funcionario.Add(novoFuncionario);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public FuncionarioDTO GetFuncionarioByEmail(string email)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var f = db.Funcionario.FirstOrDefault(x => x.Email == email);
                    return _mapper.Map<FuncionarioDTO>(f);
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public FuncionarioDTO GetFuncionarioByCPF(string cpf)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var f = db.Funcionario.FirstOrDefault(x => x.Cpf == cpf);
                    return _mapper.Map<FuncionarioDTO>(f);
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public void UpdateEmployee(AtualizarFuncionarioDTO atualizarFuncionarioDTO)
        {
            try
            {
                using (var db = new PortifolioContext())
                {
                    var emp = db.Funcionario.FirstOrDefault(x => x.Cpf == atualizarFuncionarioDTO.CPF);
                    emp.Cpf = atualizarFuncionarioDTO.CPF;
                    emp.Nome = atualizarFuncionarioDTO.Nome;
                    emp.Email = atualizarFuncionarioDTO.Email;
                    emp.IdEmpresa = atualizarFuncionarioDTO.IdEmpresa;
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
