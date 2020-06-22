using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portifolio.Dominio.DTOs.Funcionario;
using Portifolio.Dominio.Interfaces.Services;
using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.CustomsValidations;
using Portifolio.Dominio.Notifications.Funcionario;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Portifolio.Api.Site.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionarioController : Controller
    {
        private readonly NotificationContext _notificationContext;
        private readonly IFuncionarioService _iFuncionarioService;
        private readonly IEmpresaService _iEmpresaService;

        private readonly ICpfValidator _iCpfValidator;
        private readonly IEmailValidator _emailValidator;

        public FuncionarioController(NotificationContext notificationContext,
            IFuncionarioService iFuncionarioService,
            IEmpresaService iEmpresaService,
            ICpfValidator cpfValidator,
            IEmailValidator emailValidator)
        {
            _notificationContext = notificationContext;
            _iFuncionarioService = iFuncionarioService;
            _iEmpresaService = iEmpresaService;
            _iCpfValidator = cpfValidator;
            _emailValidator = emailValidator;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("GetFuncionarioByEmail/{email}")]
        public IActionResult GetFuncionarioByEmail(string email)
        {
            try
            {
                if (!_emailValidator.ValidEmail(email))
                    return BadRequest("Email Invalido.");

                var d = _iFuncionarioService.GetFuncionarioByEmail(email);

                if (d == null)
                {
                    return NotFound();
                }

                return Ok(d);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetFuncionarioByCPF/{cpf}")]
        public IActionResult GetFuncionarioByCPF(string cpf)
        {
            try
            {
                if (!_iCpfValidator.ValidCpf(cpf))
                    return BadRequest("CPF Invalido.");

                var d = _iFuncionarioService.GetFuncionarioByCPF(cpf);

                if (d == null)
                {
                    return NotFound();
                }

                return Ok(d);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult Post(IncluirFuncionarioRequest incluirFuncionarioRequest)
        {
            try
            {
                var incluirFuncionarioDTO = new IncluirFuncionarioDTO(
              incluirFuncionarioRequest.Cpf,
              incluirFuncionarioRequest.Senha,
              incluirFuncionarioRequest.Email,
              incluirFuncionarioRequest.Nome,
              incluirFuncionarioRequest.IdEmpresa
            );

                if (incluirFuncionarioDTO.Invalid)
                {
                    _notificationContext.AddNotifications(incluirFuncionarioDTO.ValidationResult);
                    return BadRequest(_notificationContext.Notifications);
                }

                var empresa = _iEmpresaService.GetEmpresaById(incluirFuncionarioRequest.IdEmpresa);
                if (empresa == null)
                {
                    return NotFound("Empresa não encontrada");
                }

                _iFuncionarioService.IncluirFuncionario(incluirFuncionarioDTO);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // PUT api/<controller>/5
        [HttpPut("UpdateEmployee")]
        public IActionResult UpdateEmployee(AtualizarFuncionarioRequest atualizarFuncionarioRequest)
        {
            try
            {
                var empresa = _iEmpresaService.GetEmpresaById(atualizarFuncionarioRequest.IdEmpresa);
                if (empresa == null)
                {
                    return NotFound("Empresa não encontrada");
                }

                var atualizarFuncionarioDTO = new AtualizarFuncionarioDTO(
                    atualizarFuncionarioRequest.CPF,
                    atualizarFuncionarioRequest.Nome,
                    atualizarFuncionarioRequest.Email,
                    atualizarFuncionarioRequest.IdEmpresa
                    );

                if (atualizarFuncionarioDTO.Invalid)
                {
                    _notificationContext.AddNotifications(atualizarFuncionarioDTO.ValidationResult);
                    return BadRequest(_notificationContext.Notifications);
                }
               

                _iFuncionarioService.UpdateEmployee(atualizarFuncionarioDTO);

                return Ok(true);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
