using AutoMapper;
using Portifolio.Dominio.DTOs.Empresa;
using Portifolio.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Data.AutoMappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Empresa, EmpresaDTO>();
        }
    }
}
