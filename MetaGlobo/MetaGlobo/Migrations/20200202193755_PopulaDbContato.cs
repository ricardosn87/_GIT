using Microsoft.EntityFrameworkCore.Migrations;

namespace MetaGlobo.Migrations
{
    public partial class PopulaDbContato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("insert into Contatos (Nome,TipoCanal,Valor,Observacao)" +
                "Values('Ricardo','Telefone','99999-9999','Novo Analista')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete from Contatos");
        }
    }
}
