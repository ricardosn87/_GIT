using Microsoft.EntityFrameworkCore;
using System;

namespace EFCore_FluentAPI_Model
{
    public class Autor
    {
        public int AutorId { get; set; }
        public string Nome { get; set; }
    }

    public class Livro
    {
        public int LivroId { get; set; }
        public string Titulo { get; set; }
    }

    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string Nome { get; set; }
    }

    public class AppDbContext:DbContext
    {
        public DbSet<Autor> Autores { get; set; }
        public DbSet<Livro> Livross { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=AppDemoDB;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("Admin");
            modelBuilder.Ignore<Usuario>();
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
