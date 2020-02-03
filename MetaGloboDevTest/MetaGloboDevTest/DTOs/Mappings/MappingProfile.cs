using AutoMapper;
using MetaGloboDevTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetaGloboDevTest.DTOs.Mappings
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Contato, ContatoCreateDTO>().ReverseMap();
            CreateMap<Contato, ContatoUpdateDTO>().ReverseMap();
            CreateMap<Contato, ContatoDTO>().ReverseMap();

        }
    }
}
