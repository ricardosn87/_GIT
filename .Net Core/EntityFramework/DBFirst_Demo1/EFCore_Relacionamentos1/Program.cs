using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace EFCore_Relacionamentos1
{

    public class Aluno
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public Endereco Endereco { get; set; }
    }

    public class Endereco
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string Cidade { get; set; }
        public int AlunoId { get; set; }
        public Aluno Aluno { get; set; }
    }

    public class Departamento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public ICollection<Funcionario> Funcionarios { get; set; }
    }

    public class Funcionario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
    }

    public class Estudante
    {
        public int CodEstudante { get; set; }
        public string Nome { get; set; }
        public ICollection<EstudanteCurso> EstudanteCursos { get; set; }
    }

    public class Curso
    {
        public int CodCurso { get; set; }
        public string CursoNome { get; set; }
        public string Descricao { get; set; }
        public ICollection<EstudanteCurso> EstudanteCursos { get; set; }
    }

    public class EstudanteCurso
    {
        public int CodEstudante { get; set; }
        public Estudante Estudante { get; set; }

        public int CodCurso { get; set; }
        public Curso Curso { get; set; }
    }

    public class AppDbContext : DbContext
    {
        //public DbSet<Aluno> Alunos { get; set; }
        //public DbSet<Endereco> Enderecos { get; set; }

        //public DbSet<Funcionario> Funcionarios { get; set; }
        //public DbSet<Departamento> Departamentos { get; set; }

        public DbSet<Curso> Cursos { get; set; }
        public DbSet<Estudante> Estudantes { get; set; }

        public DbSet<EstudanteCurso> EstudanteCursos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=AppRelacionamento;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Aluno>().HasOne<Endereco>(e => e.Endereco).WithOne(a => a.Aluno).HasForeignKey<Endereco>(a => a.AlunoId);

            ////opcao1
            //modelBuilder.Entity<Departamento>().HasMany(p => p.Funcionarios).WithOne(d => d.Departamento);

            //opcao2
            //modelBuilder.Entity<Funcionario>().HasOne(d=>d.Departamento).WithMany(f => f.Funcionarios).OnDelete(DeleteBehavior.Cascade);

            //opcao3
            //modelBuilder.Entity<Funcionario>().HasOne(d => d.Departamento).WithMany(f => f.Funcionarios).IsRequired();

            //opcao4
            //modelBuilder.Entity<Funcionario>().HasOne(d => d.Departamento).WithMany(f => f.Funcionarios).HasForeignKey(d => d.DepartamentoId);

            //opcao5

            modelBuilder.Entity<Estudante>().HasKey(a => a.CodEstudante);
            modelBuilder.Entity<Curso>().HasKey(a => a.CodCurso);

            modelBuilder.Entity<EstudanteCurso>().HasKey(sa => new { sa.CodCurso, sa.CodEstudante });

            modelBuilder.Entity<EstudanteCurso>().HasOne<Estudante>(e => e.Estudante).WithMany(e => e.EstudanteCursos).HasForeignKey(x => x.CodEstudante);
            modelBuilder.Entity<EstudanteCurso>().HasOne<Curso>(e => e.Curso).WithMany(e => e.EstudanteCursos).HasForeignKey(x => x.CodCurso);           

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
