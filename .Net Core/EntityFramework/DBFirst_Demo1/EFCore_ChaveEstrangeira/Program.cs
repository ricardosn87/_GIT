using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace EFCore_ChaveEstrangeira
{

    public class Autor
    {
        public int AutorId { get; set; }
        public string Nome { get; set; }
        public ICollection<Livro> Livros { get; set; }
    }
    public class Livro
    {
        public int LivroId { get; set; }
        public string Nome { get; set; }
        public Autor Escritor { get; set; }
    }

    public class Aluno
    {
        public int AlunoId { get; set; }
        public string Nome { get; set; }
        public Equipamento Equipamento { get; set; }
    }

    public class Equipamento
    {
        public int EquipamentoId { get; set; }
        public string Local { get; set; }
        public Aluno Aluno { get; set; }
        public int AlunoId { get; set; }
    }

    public class TesteContext : DbContext
    {
        public DbSet<Autor> Autors { get; set; }
        public DbSet<Livro> Livros { get; set; }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Equipamento> Equipamentos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=LojaDB;Integrated Security=True");
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
