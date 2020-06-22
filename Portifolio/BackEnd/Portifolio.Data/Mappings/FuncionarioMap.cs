using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portifolio.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Data.Mappings
{
    public class FuncionarioMap : IEntityTypeConfiguration<Funcionario>
    {
        public void Configure(EntityTypeBuilder<Funcionario> builder)
        {
            builder.HasKey(x => x.IdFuncionario);
            builder.Property(x => x.Cpf).IsRequired();
            builder.Property(x => x.Senha).IsRequired();
            builder.Property(x => x.DataCadastro).IsRequired();
            builder.Property(x => x.DataBloqueio);
            builder.Property(x => x.Admin).IsRequired();
            builder.Property(x => x.Email).IsRequired();
            builder.Property(x => x.IdEmpresa).IsRequired();
            builder.Property(x => x.Nome).IsRequired();
            builder.Property(x => x.Ativo).IsRequired();
        }
    }
}
