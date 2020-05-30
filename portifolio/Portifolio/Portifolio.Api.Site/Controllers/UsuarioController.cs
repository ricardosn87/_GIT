using Microsoft.AspNetCore.Mvc;
using Portifolio.Dominio.DTOs.Usuario;
using Portifolio.Dominio.Interfaces.Services;
using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.CustomsValidations;
using Portifolio.Dominio.Notifications.Usuario;
using Portifolio.Util.Email;
using System;
using System.Collections.Generic;

namespace Portifolio.Api.Site.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {

        private readonly IUsuarioService _iUsuarioService;


        private readonly NotificationContext _notificationContext;
        private readonly ICpfValidator _iCpfValidator;
        private readonly IEmailValidator _emailValidator;
        private readonly IEmailSender _emailSender;

        public UsuarioController(
            IUsuarioService iUsuarioService,
            NotificationContext notificationContext,
            ICpfValidator cpfValidator,
            IEmailValidator emailValidator,
             IEmailSender emailSender
            )
        {
            _iUsuarioService = iUsuarioService;
            _notificationContext = notificationContext;

            _iCpfValidator = cpfValidator;
            _emailValidator = emailValidator;
            _emailSender = emailSender;
        }

        // GET: api/Usuario
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Usuario/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Usuario
        [HttpPost]
        public IActionResult Post(IncluirUsuarioRequest _incluirUsuarioRequest)
        {
            var incluirUsuarioDTO = new IncluirUsuarioDTO(
                _incluirUsuarioRequest.Cpf,
                _incluirUsuarioRequest.Email,
                _incluirUsuarioRequest.Senha);

            if (incluirUsuarioDTO.Invalid)
            {
                _notificationContext.AddNotifications(incluirUsuarioDTO.ValidationResult);
                return BadRequest(_notificationContext.Notifications);
            }

            _iUsuarioService.CadastrarUsuario(incluirUsuarioDTO);
            return Ok();
        }

        // PUT: api/Usuario/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet("GetCpf/{cpf}")]
        public IActionResult GetCpf(string cpf)
        {

            if (!_iCpfValidator.ValidCpf(cpf))
                return StatusCode(400, new { Cpf = "CPF Invalido." });

            var r = _iUsuarioService.GetCpf(cpf);
            if (r == null)
            {
                return Ok(null);
            }
            return Ok(r);
        }

        [HttpGet("GetEmail/{email}")]
        public IActionResult GetEmail(string email)
        {

            if (!_emailValidator.ValidEmail(email))
                return StatusCode(400, new { Cpf = "Email Invalido." });

            var r = _iUsuarioService.GetEmail(email);
            if (r == null)
            {
                return Ok(null);
            }
            return Ok(r);
        }

        [HttpGet("GetUsuario/{email}/senha/{senha}")]
        public IActionResult GetUsuario(string email, string senha)
        {
            if (!_emailValidator.ValidEmail(email))
                return StatusCode(400, new { Cpf = "Email Invalido." });

            var r = _iUsuarioService.Login(email, senha);
            if (r == null)
            {
                return NotFound("404");
            }
            return Ok(r);
        }

        [HttpGet("RecuperarSenha/{email}")]
        public IActionResult RecuperarSenha(string email)
        {
            try
            {
                if (!_emailValidator.ValidEmail(email))
                    return BadRequest(new { Cpf = "Email Invalido." });

                var r = _iUsuarioService.GetEmail(email);

                if (r == null)
                {
                    return Ok("404");
                }

                string EmailHash = _iUsuarioService.SaveLifeTimeRecuperaSenha(email);

                _iUsuarioService.RecuperarSenha(email, "Não Responda", "http://localhost:3000/NovaSenha?key=" + EmailHash);

                return Ok("200");

            }
            catch
            {
                return BadRequest("500");
            }
        }

        [HttpPut("MudarSenha")]
        public IActionResult MudarSenha(AlterarMudarSenhaRequest alterarMudarSenhaRequest)
        {
            try
            {
                var mudarSenhaDTO = new MudarSenhaDTO(
                    alterarMudarSenhaRequest.Key, 
                    alterarMudarSenhaRequest.Senha, 
                    alterarMudarSenhaRequest.Cpf);

                if (mudarSenhaDTO.Invalid)
                {
                    _notificationContext.AddNotifications(mudarSenhaDTO.ValidationResult);
                    return BadRequest(_notificationContext.Notifications);
                }

                _iUsuarioService.MudarSenha(mudarSenhaDTO);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("500");
            }
        }
    }
}
