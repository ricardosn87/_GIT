using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GrpcConsumidor.Services.Grpc;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GrpcConsumidor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {

        private readonly IProdutoGrpcService _iProdutoGrpcService;

        public ProdutosController(IProdutoGrpcService iProdutoGrpcService)
        {
            _iProdutoGrpcService = iProdutoGrpcService;
        }
        [HttpGet]
        public async Task<IActionResult> GetProduto()
        {
            return  Ok(await _iProdutoGrpcService.ObterCompras());
        }
    }
}
