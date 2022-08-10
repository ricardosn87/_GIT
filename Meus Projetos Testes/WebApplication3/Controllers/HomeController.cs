using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace EasyNetQBus.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IMessageBus _bus;
        private IHubContext<SincronizacaoFormulario> _hubContext
        { get; set; }
        public HomeController(ILogger<HomeController> logger,
            IHubContext<SincronizacaoFormulario> hubcontext,
            IMessageBus bus)
        {
            _logger = logger;
            _hubContext = hubcontext;
            _bus = bus;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Index2()
        {
            await this._hubContext.Clients.All.SendAsync("broadcastSincronizacaoFormulario", "Chamando pelo Controller");
            return View();
        }

        public IActionResult EnvioEvento()
        {
            var envioEvent = new EventoExemplo(Guid.NewGuid(), 
                "Ricardo", 
                "ricardosn87@hotmail.com", 
                "131.343.437-03");

             _bus.Publish(envioEvent);

            return Ok();
        }
    }
}
