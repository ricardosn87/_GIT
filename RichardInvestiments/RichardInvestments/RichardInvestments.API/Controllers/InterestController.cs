using Microsoft.AspNetCore.Mvc;
using RichardInvestments.Domain.Interfaces.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RichardInvestments.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterestController : ControllerBase
    {
        private readonly IInterestService _interest;
        private readonly IRatesService _ratesService;
        public InterestController(IInterestService interest, IRatesService ratesService)
        {
            _interest = interest;
            _ratesService = ratesService;
        }

        [HttpGet("Simple/{amount}/{tax}/{period}")]
        public async Task<IActionResult> Simple([FromRoute] decimal amount, [FromRoute] decimal tax, [FromRoute] int period)
        {
            return Ok(await _interest.Simple(amount, tax, period));
        }

        [HttpGet("Compound/{amount}/{tax}/{period}")]
        public async Task<IActionResult> Compound([FromRoute] decimal amount, [FromRoute] decimal tax, [FromRoute] int period)
        {
            return Ok(await _interest.Compounds(amount, tax, period));
        }

        [HttpGet("Continuos/{amount}/{tax}/{period}")]
        public async Task<IActionResult> Continuous([FromRoute] decimal amount, [FromRoute] decimal tax, [FromRoute] int period)
        {
            return Ok(await _interest.Continuos(amount, tax, period));
        }
    }
}
