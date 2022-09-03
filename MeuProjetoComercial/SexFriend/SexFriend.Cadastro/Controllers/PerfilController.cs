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
    [Route("api/perfil")]
    [ApiController]
    public class PerfilController : MainController
    {

        private readonly IEventBus _eventBus;
        private readonly NotificationContext _notificationContext;
        private readonly IMediator _mediator;

        public PerfilController(IEventBus eventBus, NotificationContext notificationContext, IMediator mediator)
        {
            _eventBus = eventBus;
            _notificationContext = notificationContext;
            _mediator = mediator;
        }

        [HttpGet("cpf")]
        public async Task<IActionResult> GetCpf(string cpf)
        {
            try
            {
                var getCpfCommand = new GetCpfCommand() { Cpf = cpf };

                if (!getCpfCommand.EhValido())
                {
                    return CustomResponse(getCpfCommand.ValidationResult);
                }

                var response = await _mediator.Send(getCpfCommand);

                return CustomResponse(response);
            }
            catch (global::System.Exception)
            {
                throw;
            }
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

                return CustomResponse(response);
            }
            catch (global::System.Exception ex)
            {
                return CustomResponse(ex.Message);
            }
        }
    }
}
