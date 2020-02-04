using MetaGloboDevTest.Context;
using MetaGloboDevTest.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetaGloboDevTest.Repository
{
    public class ContatoRepository : Repository<Contato>, IContatoRepository
    {
        public ContatoRepository(AppDbContext appDbContext):base(appDbContext)
        {

        }

        public async Task<List<T>> FindPaged<T>(int page, int pageSize) where T : class
        {
            return await _appDbContext.Set<T>().Skip(page * pageSize).Take(pageSize).ToListAsync();
        }

        public IEnumerable<Contato> GetAll()
        {
            return Get().ToList();
        }
    }
}
