using Portifolio.Dominio.DTOs.Empresa;
using Portifolio.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Interfaces.Services
{
    public interface IEmpresaService
    {
        Empresa IncluirEmpresa(IncluirEmpresaDTO incluirEmpresaDTO);
        Empresa GetByCNPJ(string cnpj);
        void SaveUsuarioEmpresa(string email, string cnpj);
        List<Empresa> GetAllEmpresaByEmail(string email);
        bool ChangeEmploy(AlterarEmpresaDTO alterarEmpresaDTO);
        Empresa GetEmpresaById(int idEmpresa);
    }
}
