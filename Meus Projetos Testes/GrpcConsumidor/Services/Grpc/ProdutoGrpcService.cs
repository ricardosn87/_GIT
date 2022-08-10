using System;
using System.Threading.Tasks;
using GrpcProdutor.Protos;

namespace GrpcConsumidor.Services.Grpc
{
    public class ProdutoGrpcService: IProdutoGrpcService
    {
        private readonly ProdutoCompras.ProdutoComprasClient _produtoComprasClient;

        public ProdutoGrpcService(ProdutoCompras.ProdutoComprasClient produtoComprasClient)
        {
            _produtoComprasClient = produtoComprasClient;
        }

        public async Task<ProdutosComprasDTO> ObterCompras()
        {
            try
            {
                var request = new ProdutoComprasRequest()
                {

                    Id = 99,
                    Idade = 34,
                    Nome = "Ricardo"
                };
                var response = await _produtoComprasClient.ObterProdutoComprasAsync(request);
                var produtosComprasDto = new ProdutosComprasDTO()
                {
                    id = response.Id,
                    idade = response.Idade,
                    nome = response.Nome
                };

                return produtosComprasDto;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
          
        }
    }

    public class ProdutosComprasDTO
    {
        public int id { get; set; }
        public string nome { get; set; }
        public int idade { get; set; }
    }

    public interface IProdutoGrpcService
    {
        Task<ProdutosComprasDTO> ObterCompras();
    }
}
