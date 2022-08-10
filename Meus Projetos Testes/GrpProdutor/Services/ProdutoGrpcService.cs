using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using GrpcProdutor.Protos;

namespace GrpcProdutor.Services
{
    public class ProdutoGrpcService : ProdutoCompras.ProdutoComprasBase
    {
        public override async Task<ProdutoComprasResponse> ObterProdutoCompras(ProdutoComprasRequest request, ServerCallContext context)
        {
            var dados = new ProdutoComprasResponse()
            {
                Nome = request.Nome,
                Idade = request.Idade,
                Id = request.Id
            };

            return dados;
        }
    }
}
