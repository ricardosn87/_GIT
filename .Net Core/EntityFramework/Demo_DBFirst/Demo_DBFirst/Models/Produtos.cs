using System;
using System.Collections.Generic;

namespace Demo_DBFirst.Models
{
    public partial class Produtos
    {
        public int ProdutoId { get; set; }
        public string ProdutoNome { get; set; }
        public decimal ProdutoPreco { get; set; }
        public string ProdutoCategoria { get; set; }
    }
}
