using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetaGloboDevTest.Repository
{
    public interface IUnitOfWork
    {
        IContatoRepository ContatoRepository { get; }
        void Commit();
    }
}
