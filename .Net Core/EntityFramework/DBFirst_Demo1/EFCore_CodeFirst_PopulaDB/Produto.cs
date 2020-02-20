using System;
using System.Collections.Generic;
using System.Text;

namespace EFCore_CodeFirst_PopulaDB
{
    public class Produto
    {
        public int ProdutoId { get; set; }
        public string ProdutoNome { get; set; }
        public decimal ProdutoPreco { get; set; }
        public int ProdutoEstoque { get; set; }
    }
}
