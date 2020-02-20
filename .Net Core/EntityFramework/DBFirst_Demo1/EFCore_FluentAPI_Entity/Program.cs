using EFCore_FluentAPI_Entity.ConfigurationFluentAPI;
using Microsoft.EntityFrameworkCore;
using System;

namespace EFCore_FluentAPI_Entity
{

    public class Caderno
    {
        public int CadernoId { get; set; }
        public string Titulo { get; set; }
        public string AutorCaderno { get; set; }
        public int Avaliacao { get; set; }
        public DateTime DataExpurgo { get; set; }
        public DateTime UltimoAcesso { get; set; }
    }

    public class Autor
    {
        public int CodigoAutor { get; set; }
        public string Nome { get; set; }
        public string SiglaNome { get; set; }
        public string CPF { get; set; }
        public string Autor2 { get; set; }
    }

    public class Livro
    {
        public int CodigoLivro { get; set; }
        public string Titulo { get; set; }
        public string Isbn { get; set; }
    }

    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string Nome { get; set; }
    }

    public class AppDbContext : DbContext
    {
        //public DbSet<Autor> Autores { get; set; }
        //public DbSet<Livro> Livros { get; set; }
        //public DbSet<Usuario> Usuarios { get; set; }

        //public DbSet<Caderno> Cadernos { get; set; }

        public DbSet<Estoque> Estoques { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=AppDemoDB;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Livro>()
            //     .ToTable("LivrosAutores")
            //     .HasKey(t => t.CodigoLivro);

            //modelBuilder.Entity<Livro>().HasIndex(l => l.Isbn).IsUnique();

            //modelBuilder.Entity<Autor>().ToTable("AutoresPremiados").HasKey(t => new { t.Nome, t.CodigoAutor });

            //modelBuilder.Entity<Autor>().HasAlternateKey(a => a.CPF);


            //modelBuilder.Entity<Caderno>().Property(p => p.Titulo)
            //                           .HasColumnName("TituloOutro")
            //                           .HasMaxLength(150)
            //                           .IsRequired();

            //modelBuilder.Entity<Caderno>().Property(p => p.AutorCaderno)
            //    .HasColumnType("varchar(100)");

            //modelBuilder.Entity<Caderno>().Property(p => p.Avaliacao)
            //    .HasDefaultValue(3);

            //modelBuilder.Entity<Caderno>().Property(p => p.CadernoId).ValueGeneratedNever();
            //modelBuilder.Entity<Caderno>().Property(p => p.DataExpurgo).ValueGeneratedOnAdd();
            //modelBuilder.Entity<Caderno>().Property(p => p.UltimoAcesso).ValueGeneratedOnAddOrUpdate();
            //modelBuilder.Entity<Caderno>().Property(p => p.AutorCaderno).IsConcurrencyToken();

            modelBuilder.ApplyConfiguration(new EstoqueConfiguration());


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
