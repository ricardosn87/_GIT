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
       

        // GET: api/Marca/5
        [HttpGet("GetMarcaByNome/{nomemarca}")]
        public IActionResult GetMarcaByNome(string nomemarca)
        {
            try
            {
                var m = _iMarcaService.GetMarcaByNome(nomemarca);
                if(m == null)
                {
                    return NotFound("Marca não encontrada.");
                }
                return Ok(m);
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
                    incluirMarcaRequest.IdEmpresa
                    );

                if (incluirMarcaDTO.Invalid)
                {
                    _notificationContext.AddNotifications(incluirMarcaDTO.ValidationResult);
                    return BadRequest(_notificationContext.Notifications);
                }

                var empresa = _iEmpresaService.GetEmpresaById(incluirMarcaRequest.IdEmpresa);
                if (empresa == null)
                {
                    return NotFound("Empresa não encontrada");
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
