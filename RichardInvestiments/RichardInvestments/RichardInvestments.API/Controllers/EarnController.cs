using Microsoft.AspNetCore.Mvc;
using RichardInvestments.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RichardInvestments.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EarnController : ControllerBase
    {
        private readonly IEarnService _earnService;
        public EarnController(IEarnService earnService)
        {
            _earnService = earnService;
        }
        // GET: api/<EarnController>
        [HttpGet("FutureValue/{presentValue}/{rate}/{period}")]
        public async Task<IActionResult> GetFutureValue(decimal presentValue, int rate, int period)
        {
            return Ok(await _earnService.GetFutureValue(presentValue, rate, period));
        }
    }
}
