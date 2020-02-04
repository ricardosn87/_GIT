using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MetaGloboDevTest.Context;
using MetaGloboDevTest.DTOs;
using MetaGloboDevTest.Filters;
using MetaGloboDevTest.Models;
using MetaGloboDevTest.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace MetaGloboDevTest.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class ContatoController : ControllerBase
    {
        private readonly IUnitOfWork _appDbContext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;


        public ContatoController(IUnitOfWork appDbContext, IConfiguration configuration, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpGet("autor")]
        [ServiceFilter(typeof(ApiLoggingFilter))]
        public string GetAutor()
        {
            var autor = _configuration["autor"];
            return $"Autor: {autor}";
        }

        [HttpGet]
        [ServiceFilter(typeof(ApiLoggingFilter))]
        public async Task<ActionResult<IEnumerable<ContatoDTO>>> GetAll(int page = 0, int pageSize = 10)
        {          
            var contatos = await _appDbContext.ContatoRepository.FindPaged<Contato>(page, pageSize);
            var contatosDTO = _mapper.Map<List<ContatoDTO>>(contatos);
            return contatosDTO;
        }

        [HttpGet("{id}")]
        [ServiceFilter(typeof(ApiLoggingFilter))]
        public ActionResult<ContatoDTO> GetById(int id)
        {
            var contato = _appDbContext.ContatoRepository.GetById(x => x.ContatoId == id);
            var contatoDTO = _mapper.Map<ContatoDTO>(contato);
            if (contatoDTO == null)
            {
                return NotFound();
            }
            return Ok(contatoDTO);
        }

        [HttpPost]
        [ServiceFilter(typeof(ApiLoggingFilter))]
        public IActionResult Post([FromBody] ContatoCreateDTO contatoCreateDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var contato = _mapper.Map<Contato>(contatoCreateDTO);

                _appDbContext.ContatoRepository.Add(contato);
                _appDbContext.Commit();

                var contatoSave = _appDbContext.ContatoRepository.GetById(x => x.ContatoId == contato.ContatoId);
                return CreatedAtAction(nameof(GetById), new { id = contato.ContatoId }, contato);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [ServiceFilter(typeof(ApiLoggingFilter))]
        public IActionResult Put(int id, [FromBody] ContatoUpdateDTO contatoUpdateDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != contatoUpdateDTO.ContatoId)
                {
                    return NoContent();
                }

                var contatoResp = _appDbContext.ContatoRepository.GetById(x => x.ContatoId == contatoUpdateDTO.ContatoId);
                if (contatoResp == null)
                {
                    return NotFound();
                }                


                var contato = _mapper.Map<Contato>(contatoUpdateDTO);

                _appDbContext.ContatoRepository.Update(contato);
                _appDbContext.Commit();

                return Ok();


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [ServiceFilter(typeof(ApiLoggingFilter))]
        public ActionResult<ContatoDTO> Delete(int id)
        {
            try
            {
                var contatoResp = _appDbContext.ContatoRepository.GetById(x => x.ContatoId == id);
                if (contatoResp == null)
                {
                    return NotFound();
                }

                _appDbContext.ContatoRepository.Delete(contatoResp);
                _appDbContext.Commit();

                var contatoDTO = _mapper.Map<ContatoDTO>(contatoResp);

                return contatoDTO;

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}