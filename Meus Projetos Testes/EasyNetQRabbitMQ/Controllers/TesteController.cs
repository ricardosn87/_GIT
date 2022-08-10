using System;
using System.Threading.Tasks;
using MassTransit;
using MassTransitRabbitMQ.Contrato;
using MassTransitRabbitMQ.Services;
using MassTransitRabbitMQ.State;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MassTransitRabbitMQ.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TesteController : ControllerBase
    {

        private readonly IClienteService _clienteService;
        private readonly IPublishEndpoint _publishEndpoint;
        public TesteController(IClienteService clienteService, IPublishEndpoint publishEndpoint)
        {
            _clienteService = clienteService;
            _publishEndpoint = publishEndpoint;
        }


        [HttpGet, Route("enviar-mensagem")]
        public async Task<IActionResult> EnviarMensagem()
        {
            await _clienteService.EnviarMensagem();
            return Ok();
        }

        [HttpGet, Route("enviar-mensagem-direta")]
        public async Task<IActionResult> EnviarMensagemDireta()
        {
            await _clienteService.EnviarMensagemDireta();
            return Ok();
        }

        [HttpGet, Route("enviar-mensagem-saga")]
        public async Task<IActionResult> EnviarMensagemState()
        {
            var dados = new PagamentoSubmeter()
            {
                PagamentoId = Guid.NewGuid()
            };

            await _publishEndpoint.Publish(dados);
            return Ok();
        }

        [HttpGet, Route("enviar-mensagem-teste-saga")]
        public async Task<IActionResult> EnviarMensagemTesteSaga()
        {
            var submitOrder = new SubmitOrder()
            {
                OrderId = Guid.NewGuid()
            };
            await _publishEndpoint.Publish(submitOrder);
            return Ok();
        }
    }
}
