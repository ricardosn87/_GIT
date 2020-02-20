using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EFCore_CodeFirst_PopulaDB
{
    public class ApplicationDbContext:DbContext
    {
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=LojaDemoDB;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Produto>().HasData(new Produto { 
            //     ProdutoId = 7,
            //     ProdutoNome = "Compasso",
            //     ProdutoPreco = 6.50M,
            //     ProdutoEstoque = 41            
            //});

            ModelBuilderExtensions.SeedDataBase(modelBuilder);
        }
    }
}
