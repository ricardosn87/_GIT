using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portifolio.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Data.Mappings
{
    public class UsuarioRecuperaSenhaMap : IEntityTypeConfiguration<UsuarioRecuperacaoSenha>
    {
        public void Configure(EntityTypeBuilder<UsuarioRecuperacaoSenha> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Cpf).IsRequired().HasMaxLength(11);
            builder.Property(x => x.EmailHash).IsRequired().HasMaxLength(500);
            builder.Property(x => x.DataExpiracao).IsRequired();
        }
    }
}
