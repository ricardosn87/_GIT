using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using SexFriend.EventsHandlers.EventsHandlers.Cadastro;
using SexFriend.EventsInfra;
using SexFriend.EventsModels.Cadastro;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SexFriend.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServicesSubscribe(this WebApplication webApplication)
        {     
            var eventBus = webApplication.Services.GetRequiredService<IEventBus>();
            eventBus.Subscribe<CadastroHandler, CadastroEvent>(nameof(CadastroEvent), webApplication.Environment.ApplicationName);
        }

        public static void RegisterServicesBuilder(this WebApplicationBuilder webApplicationBuilder)
        {
            // API
            webApplicationBuilder.Services.AddSingleton<IEventBus, EventBus>();
            webApplicationBuilder.Services.AddScoped<IIntegrationEventHandler<CadastroEvent>, CadastroHandler>();
        }
    }
}
