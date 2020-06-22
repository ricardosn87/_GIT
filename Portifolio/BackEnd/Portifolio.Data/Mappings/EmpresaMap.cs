using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portifolio.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Data.Mappings
{
    public class EmpresaMap : IEntityTypeConfiguration<Empresa>
    {
        public void Configure(EntityTypeBuilder<Empresa> builder)
        {
            builder.HasKey(x => x.IdEmpresa);
            builder.Property(x => x.Cnpj).IsRequired();
            builder.Property(x => x.RazaoSocial).IsRequired();
            builder.Property(x => x.NomeFantasia).IsRequired();
            builder.Property(x => x.Ativo).IsRequired();
        }
    }
}
