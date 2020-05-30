using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Routing;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Portifolio.Data.AutoMappings;
using Portifolio.Data.Repository;
using Portifolio.Dominio.Interfaces.Repositories;
using Portifolio.Dominio.Interfaces.Services;
using Portifolio.Dominio.Notifications;
using Portifolio.Dominio.Notifications.CustomsValidations;
using Portifolio.Dominio.Services;
using Portifolio.Util.Email;

namespace Portifolio.Api.Site
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //registra notificação
            services.AddScoped<NotificationContext>();
            services.AddMvc(options => options.Filters.Add<NotificationFilter>())
           .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.AddTransient<ICpfValidator, CpfValidator>();
            services.AddTransient<IEmailValidator, EmailValidator>();
            services.AddTransient<ICnpjValidator, CnpjValidator>();
            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));
           

            services.AddTransient<IUsuarioService, UsuarioService>();
            services.AddTransient<IUsuarioRepository, UsuarioRepository>();
            services.AddTransient<IEmpresaService, EmpresaService>();
            services.AddTransient<IEmpresaRepository, EmpresaRepository>();
          

            services.AddTransient<IEmailSender, EmailSender>();


            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);


            services.AddControllers();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}
