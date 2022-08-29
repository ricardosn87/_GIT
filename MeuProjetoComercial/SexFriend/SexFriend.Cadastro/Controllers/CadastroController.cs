using MediatR;
using Microsoft.AspNetCore.Mvc;
using SexFriend.Cadastro.Commands;
using SexFriend.Cadastro.ViewModels;
using SexFriend.EventsInfra;
using SexFriend.EventsModels.Cadastro;
using SexFriend.System.Controllers;
using SexFriend.System.Mediator;
using SexFriend.System.Notifications;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SexFriend.Cadastro.Controllers
{
    [Route("api/cadastro")]
    [ApiController]
    public class CadastroController : MainController
    {

        private readonly IEventBus _eventBus;
        private readonly NotificationContext _notificationContext;
        private readonly IMediator _mediator;

        public CadastroController(IEventBus eventBus, NotificationContext notificationContext, IMediator mediator)
        {
            _eventBus = eventBus;
            _notificationContext = notificationContext;
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(CadastroViewModel cadastroViewModel)
        {
            try
            {
                
                var cadastraPerfilCommand = new CadastraPerfilCommand()
                {
                    Bairro = cadastroViewModel.Bairro,
                    Cidade = cadastroViewModel.Cidade,
                    Cpf = cadastroViewModel.Cpf,
                    DataNascimento = cadastroViewModel.DataNascimento,
                    Email = cadastroViewModel.Email,
                    Estado = cadastroViewModel.Estado,
                    Nome = cadastroViewModel.Nome,
                    Senha = cadastroViewModel.Senha,

                };

                if (!cadastraPerfilCommand.EhValido())
                {
                    return CustomResponse(cadastraPerfilCommand.ValidationResult);
                }

                var response = await _mediator.Send(cadastraPerfilCommand);

                return StatusCode(201);
            }
            catch (global::System.Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
