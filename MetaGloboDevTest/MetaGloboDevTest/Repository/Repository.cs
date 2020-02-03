using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MetaGloboDevTest.Context;
using MetaGloboDevTest.Models;
using MetaGloboDevTest.Repository;
using Microsoft.EntityFrameworkCore;

namespace MetaGloboDevTest.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void Add(T entity)
        {
            _appDbContext.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _appDbContext.Set<T>().Remove(entity);
        }

        public IQueryable<T> Get()
        {
            return _appDbContext.Set<T>().AsNoTracking();
        }

        public T GetById(Expression<Func<T, bool>> predicate)
        {
            return _appDbContext.Set<T>().SingleOrDefault(predicate);
        }

        public void Update(T entity)
        {            
            _appDbContext.Entry(entity).State = EntityState.Modified;
            _appDbContext.Set<T>().Update(entity);
        }
      
    }
}
