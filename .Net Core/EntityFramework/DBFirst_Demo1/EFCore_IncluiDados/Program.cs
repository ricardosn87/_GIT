using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace EFCore_IncluiDados
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
            IncluirDadosRange();
           // IncluirDados();
            ExibirDados();
            Console.ReadKey();
        }

        private static void IncluirDados()
        {
            var produtoNovo = new Produto()
            {
                ProdutoNome = "Caneta",
                ProdutoPreco = 4.49M,
                ProdutoEstoque = 10,
                ProdutoAtivo = true
            };
            using (var db = new ProdutoContext())
            {
                db.Produtos.Add(produtoNovo);
                db.SaveChanges();
            }
        }

        private static void IncluirDadosRange()
        {
            var produtoNovo = new List<Produto>
            {
               new Produto{  ProdutoNome = "Caneta2",
                ProdutoPreco = 4.49M,
                ProdutoEstoque = 10,
                ProdutoAtivo = true },
                new Produto{  ProdutoNome = "Caneta3",
                ProdutoPreco = 4.49M,
                ProdutoEstoque = 10,
                ProdutoAtivo = true },
                 new Produto{  ProdutoNome = "Caneta4",
                ProdutoPreco = 4.49M,
                ProdutoEstoque = 10,
                ProdutoAtivo = true }
            };
            using (var db = new ProdutoContext())
            {
                db.Produtos.AddRange(produtoNovo);
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
