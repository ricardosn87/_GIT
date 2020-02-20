using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore_CodeFirst_PopulaDB.Migrations
{
    public partial class Incial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Produtos",
                columns: table => new
                {
                    ProdutoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProdutoNome = table.Column<string>(nullable: true),
                    ProdutoPreco = table.Column<decimal>(nullable: false),
                    ProdutoEstoque = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produtos", x => x.ProdutoId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Produtos");
        }
    }
}
