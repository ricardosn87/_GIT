using System;
using EventBus.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using ModelsEvents;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RabbitMqBusCliente.Controllers
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

        [HttpGet, Route("enviar-cadastro")]
        public IActionResult EnviarCadastro()
        {
            ClientEvent clientEvent = new()
            {
                Idade = 34,
                Nome = "Ricardo",
                Ocorrencia = DateTime.Now
            };
            _eventBus.Publish(clientEvent, nameof(ClientEvent));

            return Ok();
        }
    }
}
