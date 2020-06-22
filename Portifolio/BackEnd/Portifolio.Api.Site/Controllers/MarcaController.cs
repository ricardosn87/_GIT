using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portifolio.Dominio.DTOs.Marca;
using Portifolio.Dominio.Interfaces.Services;
using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.Marca;

namespace Portifolio.Api.Site.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcaController : ControllerBase
    {
        private readonly IMarcaService _iMarcaService;
        private readonly IEmpresaService _iEmpresaService;
        private readonly NotificationContext _notificationContext;

        public MarcaController(NotificationContext notificationContext, IMarcaService iMarcaService, IEmpresaService iEmpresaService)
        {
            _notificationContext = notificationContext;
            _iMarcaService = iMarcaService;
            _iEmpresaService = iEmpresaService;
        }
        // GET: api/Marca
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Marca/5
        [HttpGet("GetExistMarcaByNome/{nome}")]
        public ActionResult GetExistMarcaByNome(string nome)
        {
            try
            {
                return Ok(_iMarcaService.GetExistMarcaByNome(nome));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Marca
        [HttpPost("savemarca")]
        public ActionResult SaveMarca(IncluirMarcaRequest incluirMarcaRequest)
        {
            try
            {              
                var incluirMarcaDTO = new IncluirMarcaDTO(
                    incluirMarcaRequest.Nome,
                    incluirMarcaRequest.Descricao,
                    incluirMarcaRequest.Ativo
                   
                    );

                if (incluirMarcaDTO.Invalid)
                {
                    _notificationContext.AddNotifications(incluirMarcaDTO.ValidationResult);
                    return BadRequest(_notificationContext.Notifications);
                }

                _iMarcaService.SaveMarca(incluirMarcaDTO);

                return Ok(true);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // PUT: api/Marca/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
