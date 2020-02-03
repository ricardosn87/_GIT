using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetaGlobo.Context;
using MetaGlobo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MetaGlobo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContatoController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public ContatoController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Contato>> GetAll()
        {
            return _appDbContext.Contatos.ToList();
        }

        [HttpGet("{id}")]     
        public ActionResult<IEnumerable<Contato>> GetById(int id)
        {
            var contato = _appDbContext.Contatos.FirstOrDefault(x => x.ContatoId == id);
            if (contato == null)
            {
                return NotFound();
            }
            return Ok(contato);
        }

        [HttpPost]      
        public IActionResult Post([FromBody] Contato contato)
        {
            try
            {
                _appDbContext.Contatos.Add(contato);
                _appDbContext.SaveChanges();

                var contatoSave = _appDbContext.Contatos.FirstOrDefault(x => x.ContatoId == contato.ContatoId);
                return CreatedAtAction(nameof(GetById), new { id = contato.ContatoId }, contato);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}