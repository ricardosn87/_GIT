using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using SexFriend.Cadastro;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}


//using SexFriend.Data;
//using SexFriend.EventsHandlers.EventsHandlers.Cadastro;
//using SexFriend.EventsInfra;
//using SexFriend.EventsModels.Cadastro;
//using SexFriend.System.Notifications;

//var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();


//var tt = builder.Configuration.GetConnectionString("DefaultConnection");


//// Add services to the container.
//builder.Services.AddScoped<CadastroContext>();

//builder.Services.AddDbContext<CadastroContext>(options =>
//                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//builder.Services.AddSingleton<IEventBus, EventBus>();
//builder.Services.AddScoped<IIntegrationEventHandler<CadastroEvent>, CadastroHandler>();


//builder.Services.AddScoped<NotificationContext>();

//builder.Services.AddMvc(options => options.Filters.Add<NotificationFilter>());


//builder.Services.AddControllers();

//var app = builder.Build();


//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();



//app.MapControllers();




//var eventBus = app.Services.GetRequiredService<IEventBus>();
//eventBus.Subscribe<CadastroHandler, CadastroEvent>(nameof(CadastroEvent), app.Environment.ApplicationName);

//app.Run();




