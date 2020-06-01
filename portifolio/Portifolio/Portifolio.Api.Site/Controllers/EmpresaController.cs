using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Portifolio.Dominio.DTOs.Empresa;
using Portifolio.Dominio.Interfaces.Services;
using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.CustomsValidations;
using Portifolio.Dominio.Notifications.Empresa;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Portifolio.Api.Site.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : Controller
    {
        private readonly NotificationContext _notificationContext;
        private readonly IMapper _mapper;
        private readonly ICnpjValidator _cnpjValidator;
        private readonly IEmailValidator _emailValidator;

        private readonly IEmpresaService _iEmpresaService;

        public EmpresaController(NotificationContext notificationContext, IEmpresaService iEmpresaService, IMapper mapper, ICnpjValidator cnpjValidator, IEmailValidator emailValidator)
        {
            this._notificationContext = notificationContext;
            this._iEmpresaService = iEmpresaService;
            _mapper = mapper;
            this._cnpjValidator = cnpjValidator;
            this._emailValidator = emailValidator;
        }
        // GET: api/<controller>
        [HttpGet("GetAllEmpresaByEmail/{email}")]
        public IActionResult GetAllEmpresaByEmail(string email)
        {
            try
            {
                var listaEmpresa = _mapper.Map<List<EmpresaDTO>>(_iEmpresaService.GetAllEmpresaByEmail(email));            
                return Ok(listaEmpresa);
               
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<controller>/5
        [HttpGet("GetByCNPJ/{cnpj}")]
        public IActionResult Get(string cnpj)
        {
            if (!_cnpjValidator.ValidaCNPJ(cnpj))
            {
                return BadRequest(new { CNPJ = "CNPJ Invalido." });
            }
            return Ok(_mapper.Map<EmpresaDTO>(_iEmpresaService.GetByCNPJ(cnpj)));
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult Post(IncluirEmpresaRequest incluirEmpresaRequest)
        {
            var incluirEmpresaDTO = new IncluirEmpresaDTO(
                incluirEmpresaRequest.Cnpj,
                incluirEmpresaRequest.RazaoSocial,
                incluirEmpresaRequest.NomeFantasia
                );

            if (incluirEmpresaDTO.Invalid)
            {
                _notificationContext.AddNotifications(incluirEmpresaDTO.ValidationResult);
                return BadRequest(_notificationContext.Notifications);
            }
            var d = _mapper.Map<EmpresaDTO>(_iEmpresaService.IncluirEmpresa(incluirEmpresaDTO));
            return Ok(d);
        }

        // PUT api/<controller>/5
        [HttpPost("SaveUsuarioEmpresa/email/{email}/cnpj/{cnpj}")]
        public IActionResult Post(string email, string cnpj)
        {
            try
            {
                if (!_cnpjValidator.ValidaCNPJ(cnpj))
                {
                    return BadRequest(new { CNPJ = "CNPJ Invalido." });
                }

                if (!_emailValidator.ValidEmail(email))
                    return BadRequest(new { Cpf = "Email Invalido." });


                _iEmpresaService.SaveUsuarioEmpresa(email, cnpj);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("ChangeEmploy")]
        public IActionResult ChangeEmploy(AlterarEmpresaRequest alterarEmpresaRequest)
        {
            try
            {
                var alterarEmpresaDTO = new AlterarEmpresaDTO(
                                         alterarEmpresaRequest.Cnpj,
                                         alterarEmpresaRequest.RazaoSocial,
                                         alterarEmpresaRequest.NomeFantasia);

                if (alterarEmpresaDTO.Invalid)
                {
                    _notificationContext.AddNotifications(alterarEmpresaDTO.ValidationResult);
                    return BadRequest(_notificationContext.Notifications);
                }
                return Ok(_iEmpresaService.ChangeEmploy(alterarEmpresaDTO));
            }
            catch(Exception ex)
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
