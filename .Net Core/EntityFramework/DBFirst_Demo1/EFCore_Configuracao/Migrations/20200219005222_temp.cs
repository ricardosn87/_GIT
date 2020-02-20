using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore_Configuracao.Migrations
{
    public partial class temp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Admin");

            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    Codigo = table.Column<int>(nullable: false),
                    Nome = table.Column<string>(nullable: true),
                    Descricao = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.Codigo);
                });

            migrationBuilder.CreateTable(
                name: "NovosProdutos",
                schema: "Admin",
                columns: table => new
                {
                    ProdutoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomeProduto = table.Column<string>(type: "Varchar(50)", nullable: true),
                    Preco = table.Column<decimal>(nullable: false),
                    Estoque = table.Column<int>(nullable: false),
                    Descricao = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NovosProdutos", x => x.ProdutoId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categorias");

            migrationBuilder.DropTable(
                name: "NovosProdutos",
                schema: "Admin");
        }
    }
}
