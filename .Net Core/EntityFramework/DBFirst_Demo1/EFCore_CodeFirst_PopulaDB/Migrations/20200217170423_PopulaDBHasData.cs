using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore_CodeFirst_PopulaDB.Migrations
{
    public partial class PopulaDBHasData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Produtos",
                columns: new[] { "ProdutoId", "ProdutoEstoque", "ProdutoNome", "ProdutoPreco" },
                values: new object[] { 7, 41, "Compasso", 6.50m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Produtos",
                keyColumn: "ProdutoId",
                keyValue: 7);
        }
    }
}
