using MetaGloboDevTest.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetaGloboDevTest.Repository
{
    public class UnitOfWork : IUnitOfWork
    {

        private ContatoRepository _contatoRepository;
        public AppDbContext _appDbContext;

        public IContatoRepository ContatoRepository
        {
            get
            {
                return _contatoRepository = _contatoRepository ?? new ContatoRepository(_appDbContext);
            }
        }


        public UnitOfWork(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            _appDbContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public void Commit()
        {
            _appDbContext.SaveChanges();
        }

        public void Dispose()
        {
            _appDbContext.Dispose();
        }    
    }
}
