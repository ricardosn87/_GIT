using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EFCore_CodeFirst_PopulaDB
{
    public static class ModelBuilderExtensions
    {
        public static void SeedDataBase(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produto>().HasData(new Produto
            {
                ProdutoId = 8,
                ProdutoNome = "Transferidor",
                ProdutoPreco = 6.50M,
                ProdutoEstoque = 41
            });
        }
    }
}
