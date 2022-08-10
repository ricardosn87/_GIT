using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
       
        [HttpGet("vindoerromidlleware")]
        public IActionResult VindoErroMidlleware()
        {
            return Ok("vindoerromidlleware");
        }

        [HttpGet("erromidlleware")]
        public IActionResult ErroMidllewareTeste()
        {
            throw new Exception();
        }

        [HttpGet("autorizacao-cookie/{nome}")]
        public IActionResult Cookie(string nome)
        {
            var userClaims = new List<Claim>()
                {
  
                    new Claim(ClaimTypes.Name, nome),
                    new Claim(ClaimTypes.Email, "macoratti@teste.com"),
                };
            var minhaIdentity = new ClaimsIdentity(userClaims, "Usuario");
            var userPrincipal = new ClaimsPrincipal(new[] { minhaIdentity });
         
            HttpContext.SignInAsync(userPrincipal);
            return Ok("Nome: " + nome);
        }

        [HttpGet("autorizacao-token/{nome}/{senha}")]
        public IActionResult Token(string nome,string senha)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("fedaf7d8863b48e197b9287d492b708e");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, nome),
                    new Claim(ClaimTypes.Role, senha)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(token);
        }

        [Authorize]
        [HttpGet]
        public IActionResult Autorizado()
        {
            return Ok("Autorizado");
        }
    }
}
