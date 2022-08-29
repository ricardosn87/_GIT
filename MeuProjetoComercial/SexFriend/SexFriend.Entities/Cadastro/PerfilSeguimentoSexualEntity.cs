using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SexFriend.Entities.Cadastro
{
    public class PerfilSeguimentoSexualEntity :Entity
    {
        public PerfilSeguimentoSexualEntity(int idSeguimentoSexual, int idPerfil)
        {        
            IdSeguimentoSexual = idSeguimentoSexual;
            IdPerfil = idPerfil;

            Validate(this, new PerfilSeguimentoSexualEntityValidator());
        }

        [Key]
        public int IdPerfilSeguimentoSexual { get; set; }

        public int IdSeguimentoSexual { get; set; }

        public int IdPerfil { get; set; }

    }

    public class PerfilSeguimentoSexualEntityValidator : AbstractValidator<PerfilSeguimentoSexualEntity>
    {
        public PerfilSeguimentoSexualEntityValidator()
        {
            RuleFor(x => x.IdSeguimentoSexual).Empty().WithMessage("Tipo Seguimento Sexual não pode ser vazio.");
            RuleFor(x => x.IdPerfil).Empty().WithMessage("Perfil não pode ser vazio.");
        }
    }
}
