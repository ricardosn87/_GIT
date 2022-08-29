using SexFriend.Data;
using SexFriend.Entities;
using SexFriend.Repository.Interfaces;

using System.Threading.Tasks;

namespace SexFriend.Repository
{
    public class RepositoryPerfil :  IRepositoryPerfil
    {
        private readonly CadastroContext _context;
       
        public RepositoryPerfil(CadastroContext context)
        {
            _context = context;
           
        }
        public async Task Save(PerfilEntity perfilEntity)
        {
            try
            {
                _context.Add(perfilEntity);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {
                throw;
            }         
        }
    }
}
