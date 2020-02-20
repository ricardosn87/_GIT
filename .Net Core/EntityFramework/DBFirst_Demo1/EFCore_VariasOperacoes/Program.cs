using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using System;
using System.Linq;

namespace EFCore_VariasOperacoes
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

            optionsBuilder.EnableSensitiveDataLogging(true)
                .UseLoggerFactory(new LoggerFactory().AddConsole((categoy, level) =>
                level == LogLevel.Information &&
                categoy == DbLoggerCategory.Database.Command.Name, true));


        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new ProdutoContext())
            {
                ExibirDados();

                var produto = new Produto
                {
                    ProdutoNome = "Pilha",
                    ProdutoEstoque = 44,
                    ProdutoPreco = 4.99M,
                    ProdutoAtivo = true

                };

                db.Produtos.Add(produto);

                var primeiroProduto = db.Produtos.First();
                primeiroProduto.ProdutoEstoque = 1111;

                var ultimoProdutoId = db.Produtos.Max(x=>x.ProdutoId);
                var ultimoProduto = db.Produtos.FirstOrDefault(x => x.ProdutoId == ultimoProdutoId);
                db.Produtos.Remove(ultimoProduto);

                db.SaveChanges();

                Console.ReadLine();
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
