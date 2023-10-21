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
    public class RateController : ControllerBase
    {
        private readonly IRatesService _ratesService;
        public RateController(IRatesService ratesService)
        {
            _ratesService = ratesService;
        }
        // GET: api/<RateController>
        [HttpGet("Equivalence/{rate}/{havePeriod}/{wantPeriod}")]
        public async Task<IActionResult> Equivalence([FromRoute] decimal rate,[FromRoute] int havePeriod, [FromRoute] int wantPeriod)
        {
            return Ok(await _ratesService.Equivalence(rate, havePeriod, wantPeriod));
        }

        [HttpGet("InterestRealandNominal/{selic}/{ipca}")]
        public async Task<IActionResult> InterestRealandNominal([FromRoute] decimal selic,[FromRoute] decimal ipca)
        {
            return Ok(await _ratesService.InterestRealAndNominal(selic, ipca));
        }
    }
}
