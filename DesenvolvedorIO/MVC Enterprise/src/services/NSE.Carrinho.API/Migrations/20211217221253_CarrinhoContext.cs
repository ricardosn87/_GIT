using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NSE.Carrinho.API.Migrations
{
    public partial class CarrinhoContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarrinhoCliente",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ClienteId = table.Column<Guid>(nullable: false),
                    ValorTotal = table.Column<decimal>(nullable: false),
                    VoucherUtilizado = table.Column<bool>(nullable: false),
                    Desconto = table.Column<decimal>(nullable: false),
                    Percentual = table.Column<decimal>(nullable: true),
                    ValorDesconto = table.Column<decimal>(nullable: true),
                    VoucherCodigo = table.Column<string>(type: "varchar(50)", nullable: true),
                    TipoDesconto = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarrinhoCliente", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CarrinhoItens",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ProdutoId = table.Column<Guid>(nullable: false),
                    Nome = table.Column<string>(type: "varchar(100)", nullable: true),
                    Quantidade = table.Column<int>(nullable: false),
                    Valor = table.Column<decimal>(nullable: false),
                    Imagem = table.Column<string>(type: "varchar(100)", nullable: true),
                    CarrinhoId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarrinhoItens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarrinhoItens_CarrinhoCliente_CarrinhoId",
                        column: x => x.CarrinhoId,
                        principalTable: "CarrinhoCliente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IDX_Cliente",
                table: "CarrinhoCliente",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_CarrinhoItens_CarrinhoId",
                table: "CarrinhoItens",
                column: "CarrinhoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarrinhoItens");

            migrationBuilder.DropTable(
                name: "CarrinhoCliente");
        }
    }
}
