using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace EasyNetQBus
{
    public class SincronizacaoFormulario : Hub
    {
        public async Task SendSincronizacao(string message)
        {
            await Clients.All.SendAsync("broadcastSincronizacaoFormulario", message);
        }
    }
}
