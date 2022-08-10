using System;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IMessageBus _bus;

        public ValuesController(IMessageBus bus)
        {
            _bus = bus;
        }
        //[Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            
            return Ok("outra API conectado");
        }

        [HttpGet("name")]
        public IActionResult Name()
        {
            var d = HttpContext.User.Identity.IsAuthenticated;
            return Ok(d);
        }

        [HttpGet("envioevento")]
        public IActionResult EnvioEvento()
        {
            var envioEvent = new EventoExemploEvent(Guid.NewGuid(),
                "Ricardo",
                "ricardosn87@hotmail.com",
                "131.343.437-03",
                DateTime.Now);

            _bus.Publish(envioEvent);

            return Ok();
        }
    }
}
