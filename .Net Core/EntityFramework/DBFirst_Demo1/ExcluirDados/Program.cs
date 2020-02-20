using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace ExcluirDados
{
    class Produto
    {
        public int ProdutoId { get; set; }
        public string ProdutoNome { get; set; }
        public decimal ProdutoPreco { get; set; }
        public int ProdutoEstoque { get; set; }
        public bool ProdutoAtivo { get; set; }
    }
    class ProdutoContext : DbContext
    {
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=LojaDB;Integrated Security=True");
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            ExcluirDados();
            ExibirDados();
            Console.ReadLine();
        }
        private static void ExcluirDados()
        {
            using (var db = new ProdutoContext())
            {
                var produto = db.Produtos.First();
                db.Produtos.Remove(produto);
                db.SaveChanges();
            }
        }

        private static void ExibirDados()
        {
            using (var db = new ProdutoContext())
            {
                var produtos = db.Produtos;

                foreach (var p in produtos)
                {
                    Console.WriteLine(p.ProdutoNome + "\t" + p.ProdutoPreco.ToString("C"));
                }
            }
        }
    }
}
