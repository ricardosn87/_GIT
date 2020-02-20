using System;

namespace EFCore_CodeFirst_PopulaDB
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new ApplicationDbContext())
            {

                //Console.WriteLine("Alimentando banco de dados!");
                //SeedDataBase.SeedProdutos(db);

                var produtos = db.Produtos;            

                foreach (var p in produtos)
                {
                    Console.WriteLine(p.ProdutoNome + "\t" + p.ProdutoPreco.ToString("C"));
                }
            }
            Console.ReadKey();
        }
    }
}
