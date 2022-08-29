
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SexFriend.Entities;
using SexFriend.Entities.Cadastro;


namespace SexFriend.Data
{
    public class CadastroContext : DbContext
    {
        public CadastroContext(DbContextOptions<CadastroContext> options)
           : base(options)
        {
            //ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            //ChangeTracker.AutoDetectChangesEnabled = false;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<ValidationResult>();
        }

        public DbSet<PerfilEntity> Perfil { get; set; }

        public DbSet<PerfilAlbumEntity> PerfilAlbum { get; set; }

        public DbSet<PerfilSeguimentoSexualEntity> PerfilSeguimentoSexual { get; set; }
        public DbSet<TipoSeguimentoSexualEntity> TipoSeguimentoSexual { get; set; }
    }
}
