using Microsoft.EntityFrameworkCore;
using SexFriend.Data;
using SexFriend.Entities;
using SexFriend.Repository.Interfaces;
using System.Linq;
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
            catch (System.Exception)
            {
                throw;
            }         
        }

        public async Task<string> GetCpf(string cpf)
        {
            try
            {
                var r = await _context.Perfil.FirstOrDefaultAsync(w => w.Cpf == cpf);
                return r.Cpf;
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}
