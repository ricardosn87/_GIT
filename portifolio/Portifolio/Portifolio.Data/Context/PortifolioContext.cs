using Microsoft.EntityFrameworkCore;
using Portifolio.Data.Mappings;
using Portifolio.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Data.Context
{
    public class PortifolioContext : DbContext
    {

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<UsuarioRecuperacaoSenha> UsuarioRecuperacaoSenha { get; set; }
        public DbSet<Empresa> Empresa { get; set; }
        public DbSet<UsuarioEmpresa> UsuarioEmpresa { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=SiteDB;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UsuarioMap());
            modelBuilder.ApplyConfiguration(new UsuarioRecuperaSenhaMap());
            modelBuilder.ApplyConfiguration(new EmpresaMap());
            modelBuilder.ApplyConfiguration(new UsuarioEmpresaMap());
        }
    }
}
