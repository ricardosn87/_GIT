using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace WebApplication1
{
    public class ErroMidlleware
    {
        private readonly RequestDelegate _next;

        public ErroMidlleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                   
                await _next(httpContext);
            }
            catch (Exception ex)
            {

                HandleCircuitBreakerExceptionAsync(httpContext);
            }
        }

        private static void HandleCircuitBreakerExceptionAsync(HttpContext context)
        {
            context.Response.Redirect("/vindoerromidlleware");
        }
    }
}
