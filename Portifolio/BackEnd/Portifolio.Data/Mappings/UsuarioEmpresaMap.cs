using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portifolio.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Data.Mappings
{
    public class UsuarioEmpresaMap : IEntityTypeConfiguration<UsuarioEmpresa>
    {
        public void Configure(EntityTypeBuilder<UsuarioEmpresa> builder)
        {
            builder.HasKey(x => x.IdUsuarioEmpresa);
            builder.Property(x => x.IdEmpresa).IsRequired();
            builder.Property(x => x.IdUsuario).IsRequired();
        }
    }
}
