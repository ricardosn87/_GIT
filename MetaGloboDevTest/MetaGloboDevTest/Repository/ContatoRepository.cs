using MetaGloboDevTest.Context;
using MetaGloboDevTest.Models;
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
        public IEnumerable<Contato> GetAll()
        {
            return Get().ToList();
        }
    }
}
