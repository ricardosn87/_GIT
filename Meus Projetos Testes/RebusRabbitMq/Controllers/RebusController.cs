using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rebus.Bus;
using RebusRabbitMq.Eventos;
using RebusRabbitMq.Orquestrador.Commands;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RebusRabbitMq.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RebusController : ControllerBase
    {
        private  readonly IBus _bus;

        public RebusController(IBus bus)
        {
            _bus = bus;
        }

        [HttpGet]
        public async Task<IActionResult> PublishEvent()
        {
            var headers = new Dictionary<string, string>();
            var evento = new RemoverEstoqueEvent(headers, "", 1);
            await _bus.Publish(evento);

            return Ok();
        }

        [HttpGet,Route("publish-event-saga")]
        public async Task<IActionResult> PublishEventSaga()
        {
            await _bus.Send(new StartSagaCommand { AggregateId = Guid.NewGuid() });
            return Ok();
        }
    }
}
