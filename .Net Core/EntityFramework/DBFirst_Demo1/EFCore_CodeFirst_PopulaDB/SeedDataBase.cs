using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EFCore_CodeFirst_PopulaDB
{
    public  class SeedDataBase
    {
        public static void SeedProdutos(ApplicationDbContext applicationDbContext)
        {
            if (!applicationDbContext.Produtos.Any())
            {
                var produtos = new List<Produto> { 
                    new Produto {ProdutoNome = "Canela", ProdutoEstoque = 20 , ProdutoPreco = 2.23M},
                    new Produto {ProdutoNome = "Borracha", ProdutoEstoque = 20 , ProdutoPreco = 8.23M},
                    new Produto {ProdutoNome = "Lapias", ProdutoEstoque = 20 , ProdutoPreco = 2.23M}
                };

                applicationDbContext.AddRange(produtos);
                applicationDbContext.SaveChanges();
            }
            
        }
    }
}
