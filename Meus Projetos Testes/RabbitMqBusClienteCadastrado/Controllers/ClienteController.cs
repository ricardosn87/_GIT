using EventBus.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using ModelsEvents;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RabbitMqBusClienteCadastrado.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IEventBus _eventBus;

        public ClienteController(IEventBus eventBus)
        {
            _eventBus = eventBus;
        }
        [HttpGet, Route("enviar-cadastro-ok")]
        public IActionResult EnviarCadastroOk()
        {
            var cadastroOkEvent = new CadastroOkEvent()
            {
                CadastroOk = false
            };
            _eventBus.Publish(cadastroOkEvent, nameof(CadastroOkEvent));

            return Ok();
        }
    }
}
