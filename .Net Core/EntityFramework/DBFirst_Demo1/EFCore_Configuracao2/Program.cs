using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFCore_Configuracao2
{
    public class Autor
    {
        public int AutorId { get; set; }
        public string Nome { get; set; }

        [ForeignKey("AutorFK")]
        public ICollection<Livro> Livros { get; set; }
    }

    public class Livro
    {
        public int LivroId { get; set; }
        public string Titulo { get; set; }      
        public Autor Autor { get; set; }       
        public int AutorFK { get; set; }
    }

    class AppContext : DbContext
    {

        public DbSet<Autor> Autors { get; set; }
        public DbSet<Livro> Livros { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=Configuracao;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Produto>().Property(t => t.Descricao).IsRequired().HasMaxLength(200);
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
