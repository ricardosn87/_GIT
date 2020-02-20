using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EFCore_FluentAPI_Entity.ConfigurationFluentAPI
{
    public class EstoqueConfiguration:IEntityTypeConfiguration<Estoque>
    {
        public void Configure(EntityTypeBuilder<Estoque> entityTypeBuilder)
        {
            entityTypeBuilder.HasKey(x => x.EstoqueId);
            entityTypeBuilder.Property(x => x.Nome).IsRequired();
        }
    }
}
