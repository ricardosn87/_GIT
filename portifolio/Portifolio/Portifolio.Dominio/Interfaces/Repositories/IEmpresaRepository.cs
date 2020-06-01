using Portifolio.Dominio.DTOs.Empresa;
using Portifolio.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Dominio.Interfaces.Repositories
{
    public interface IEmpresaRepository
    {
        Empresa IncluirEmpresa(IncluirEmpresaDTO incluirEmpresaDTO);
        Empresa GetByCNPJ(string cnpj);
        void SaveUsuarioEmpresa(string email, string cnpj);
        List<Empresa> GetAllEmpresaByEmail(string email);
        bool ChangeEmploy(AlterarEmpresaDTO alterarEmpresaDTO);
    }
}
