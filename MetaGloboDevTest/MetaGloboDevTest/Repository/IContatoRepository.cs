using MetaGloboDevTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetaGloboDevTest.Repository
{
    public interface IContatoRepository:IRepository<Contato>
    {
        IEnumerable<Contato> GetAll();

        Task<List<T>> FindPaged<T>(int page, int pageSize) where T : class;

    }
}
