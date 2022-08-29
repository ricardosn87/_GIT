using EasyNetQ.Events;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SexFriend.Cadastro.Commands;
using SexFriend.Entities;
using SexFriend.Entities.Cadastro;
using SexFriend.Repository.Interfaces;
using SexFriend.System.Commands;
using System.Threading;
using System.Threading.Tasks;

namespace SexFriend.Cadastro.CommandHandlers
{

    public class CadastraCommandHandler : Command,
        IRequestHandler<CadastraPerfilCommand, ValidationResult>
    {
        private readonly IRepositoryPerfil _repository;
        public CadastraCommandHandler(IMediator mediator, IRepositoryPerfil repository)
        {
            this._repository = repository;
        }

        public async Task<ValidationResult> Handle(CadastraPerfilCommand request, CancellationToken cancellationToken)
        {
            try
            {
                if (!request.EhValido()) return request.ValidationResult;

                var perfil = new PerfilEntity(
                 cpf: request.Cpf,
                 nome: request.Nome,
                 dataNascimento: request.DataNascimento,
                 email: request.Email,
                 senha: request.Senha,
                 estado: request.Estado,
                 cidade: request.Cidade,
                 bairro: request.Bairro
                 );

                await _repository.Save(perfil);

                return request.ValidationResult;
            }
            catch (global::System.Exception)
            {

                throw;
            }
        }
    }
}
