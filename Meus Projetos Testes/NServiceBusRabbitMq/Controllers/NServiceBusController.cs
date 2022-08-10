using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NServiceBus;
using NServiceBusRabbitMq.Commands;
using NServiceBusRabbitMq.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NServiceBusRabbitMq.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NServiceBusController : ControllerBase
    {

        private readonly IServiceBusMessage _serviceBusMessage;

        public NServiceBusController(IServiceBusMessage serviceBusMessage)
        {
            _serviceBusMessage = serviceBusMessage;
        }

        [HttpGet,Route("enviar-mensagem")]
        public async Task<IActionResult> EnviarMesagem()
        {
            try
            {
                var adicionarPedido = new PagamentoNeonCommand(Guid.NewGuid(), 8000);

                var endPoint = await _serviceBusMessage.GetConfiguration();
                await endPoint.SendLocal(adicionarPedido);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
