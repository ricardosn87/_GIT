using Portifolio.Dominio.DTOs.Empresa;
using Portifolio.Dominio.Entidades;
using Portifolio.Dominio.Interfaces.Repositories;
using Portifolio.Dominio.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Services
{
    public class EmpresaService : IEmpresaService
    {
        private readonly IEmpresaRepository _empresaRepository;
        public EmpresaService(IEmpresaRepository empresaRepository)
        {
            this._empresaRepository = empresaRepository;
        }
        public Empresa IncluirEmpresa(IncluirEmpresaDTO incluirEmpresaDTO)
        {
            return _empresaRepository.IncluirEmpresa(incluirEmpresaDTO);
        }

        public Empresa GetByCNPJ(string cnpj)
        {
            return _empresaRepository.GetByCNPJ(cnpj);
        }

        public void SaveUsuarioEmpresa(string email, string cnpj)
        {
            _empresaRepository.SaveUsuarioEmpresa(email, cnpj);
        }

        public List<Empresa> GetAllEmpresaByEmail(string email)
        {
            return _empresaRepository.GetAllEmpresaByEmail(email);
        }

        public bool ChangeEmploy(AlterarEmpresaDTO alterarEmpresaDTO)
        {
            return _empresaRepository.ChangeEmploy(alterarEmpresaDTO);
        }

        public Empresa GetEmpresaById(int idEmpresa)
        {
            return _empresaRepository.GetEmpresaById(idEmpresa);
        }
    }
}
