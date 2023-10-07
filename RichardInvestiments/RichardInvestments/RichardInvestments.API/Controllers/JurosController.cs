using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RichardInvestments.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JurosController : ControllerBase
    {
        // GET: api/<JurosController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<JurosController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<JurosController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<JurosController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<JurosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
