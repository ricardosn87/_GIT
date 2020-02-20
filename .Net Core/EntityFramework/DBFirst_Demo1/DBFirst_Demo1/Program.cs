using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;


namespace DBFirst_Demo1
{

    class Produto
    {
        public int ProdutoId { get; set; }
        public string ProdutoNome { get; set; }
        public decimal ProdutoPreco { get; set; }
        public int ProdutoEstoque { get; set; }
        public bool ProdutoAtivo { get; set; }
       
    }

    class Categoria
    {
        public int CategoriaId { get; set; }
        public string CategoriaNome { get; set; }
        public ICollection<Produto> Produtos { get; set; }
    }
    
    class ProdutoContext : DbContext
    {

        public DbSet<Categoria> Categorias { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=LojaDB;Integrated Security=True");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            using(var db = new ProdutoContext())
            {
                var produtos = db.Categorias;

                foreach(var p in produtos)
                {
                    Console.WriteLine(p.CategoriaNome + "\t" + p.CategoriaId);
                }
            }
            Console.ReadKey();
        }
    }
}
