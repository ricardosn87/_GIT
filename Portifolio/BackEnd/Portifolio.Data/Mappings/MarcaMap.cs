using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portifolio.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portifolio.Data.Mappings
{
    public class MarcaMap : IEntityTypeConfiguration<Marca>
    {
        public void Configure(EntityTypeBuilder<Marca> builder)
        {
            builder.HasKey(x => x.IdMarca);
            builder.Property(x => x.Nome).IsRequired();
            builder.Property(x => x.Descricao).IsRequired();
            builder.Property(x => x.Ativo).IsRequired();           
        }
    }
}
