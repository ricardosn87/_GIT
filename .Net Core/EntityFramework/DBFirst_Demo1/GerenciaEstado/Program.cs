using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;

namespace GerenciaEstado
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Estoque { get; set; }
        public string Categoria { get; set; }
    }

    public class ProdutoContext : DbContext
    {
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=Gerenciamento;Integrated Security=True");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            using(var db = new ProdutoContext())
            {
                var produtos = db.Produtos;
                foreach(var p in produtos)
                {
                    Console.WriteLine(p.Nome);
                }
                Console.WriteLine("****************Pesquisa***************");
                ExibirEstado(db.ChangeTracker.Entries());

                Produto produto = new Produto();
                produto.Categoria = "opa";
                produto.Estoque = 10;
                produto.Nome = "Ricardo";
                db.Produtos.Add(produto);

                Console.WriteLine("****************Add***************");
                ExibirEstado(db.ChangeTracker.Entries());

                var proAlter = db.Produtos.Find(1);
                proAlter.Nome = "ooooooooooo";

                Console.WriteLine("****************Alter***************");
                ExibirEstado(db.ChangeTracker.Entries());

               
                var proDele = db.Produtos.Find(1);
                db.Produtos.Remove(proDele);

                Console.WriteLine("****************Delete***************");
                ExibirEstado(db.ChangeTracker.Entries());

            }

            Console.ReadKey();
        }

        private static void ExibirEstado(IEnumerable<EntityEntry> entries)
        {
            foreach (var e in entries)
            {
                Console.WriteLine("Estado Entidade: " +  e.State);
            }
        }
    }
}
