
using SexFriend.Data;
using SexFriend.Entities;
using SexFriend.Entities.Cadastro;
using SexFriend.EventsInfra;
using SexFriend.EventsModels.Cadastro;
using SexFriend.System.Notifications;
using System;
using System.Threading.Tasks;

namespace SexFriend.EventsHandlers.EventsHandlers.Cadastro
{
    public class CadastroHandler : IIntegrationEventHandler<CadastroEvent>
    {
        private readonly CadastroContext _context;
        private readonly NotificationContext _notificationContext;

        public CadastroHandler(CadastroContext context, NotificationContext notificationContext)
        {
            _context = context;
            _notificationContext = notificationContext;
        }

        public async Task Handle(CadastroEvent @event)
        {
            try
            {
                //using var transaction = _context.Database.BeginTransaction();

                //var perfil = new PerfilEntity(
                //   cpf: @event.Cpf,
                //   nome: @event.Nome,
                //   dataNascimento: @event.DataNascimento.ToString(),
                //   email: @event.Email,
                //   senha: @event.Senha,
                //   estado: @event.Estado,
                //   cidade: @event.Cidade,
                //   bairro: @event.Bairro
                //   );

                ////if (perfil.Invalid)
                ////{
                ////    _notificationContext.AddNotifications(perfil.ValidationResult);
                ////}

                //_context.Add(perfil);
                //await _context.SaveChangesAsync();

                //var perfimAlbum = new PerfilAlbumEntity(
                //    idPerfilCpf: perfil.IdPerfil,
                //    foto: @event.Foto
                // );
                //_context.Add(perfimAlbum);
                //await _context.SaveChangesAsync();

                //var perfilSeguimentoSexual = new PerfilSeguimentoSexualEntity(
                //  idPerfil: perfil.IdPerfil,
                //  idSeguimentoSexual: @event.IdTipoSeguimentoSexual);

                //if (perfilSeguimentoSexual.Invalid)
                //{
                //    //_notificationContext.AddNotifications(perfil.ValidationResult);
                //}

                //_context.Add(perfilSeguimentoSexual);
                //await _context.SaveChangesAsync();    

                //await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                _notificationContext.AddNotification(DateTime.Now.ToString(), ex.ToString());
            }
        }
    }
}
