using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace EasyNetQBus
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
                //int a = 1;
                //if (a == 1)
                //{
                //    HandleCircuitBreakerExceptionAsync(httpContext);
                //    return;
                //}

                await _next(httpContext);
            }
            catch (Exception ex)
            {

                HandleCircuitBreakerExceptionAsync(httpContext);
            }
        }

        private static void HandleCircuitBreakerExceptionAsync(HttpContext context)
        {
            context.Response.Redirect("/erro");
        }
    }
}
