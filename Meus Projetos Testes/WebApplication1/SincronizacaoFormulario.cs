using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace WebApplication1
{
    public class SincronizacaoFormulario : Hub
    {
        public async Task SendSincronizacao(string value)
        {
            await Clients.All.SendAsync("broadcastSincronizacaoFormulario", value);
        }
    }
}
