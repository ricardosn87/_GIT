using SexFriend.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SexFriend.Repository.Interfaces
{
    public interface IRepositoryPerfil
    {
        Task Save(PerfilEntity perfilEntity);
    }
}
