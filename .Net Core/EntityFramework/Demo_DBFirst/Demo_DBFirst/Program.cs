using Microsoft.EntityFrameworkCore;
using System;

namespace Demo_DBFirst
{


    class ProdutoContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=CursoEFCoreDB;Integrated Security=True");
        }
        public DbSet<Produto> Produtos { get; set; }
    }

    public class Produto
    {
        public int ProdutoId { get; set; }
        public string ProdutoNome { get; set; }
        public decimal ProdutoPreco { get; set; }
        public string ProdutoCategoria { get; set; }
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
                    Console.WriteLine(p.ProdutoNome + "\t" + p.ProdutoPreco.ToString("C"));
                }
            }
            Console.ReadLine();           
        }
    }
}
