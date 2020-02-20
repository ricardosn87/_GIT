using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore_FluentAPI_Entity.Migrations
{
    public partial class temp2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cadernos");

            migrationBuilder.CreateTable(
                name: "Estoques",
                columns: table => new
                {
                    EstoqueId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estoques", x => x.EstoqueId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Estoques");

            migrationBuilder.CreateTable(
                name: "Cadernos",
                columns: table => new
                {
                    CadernoId = table.Column<int>(type: "int", nullable: false),
                    AutorCaderno = table.Column<string>(type: "varchar(100)", nullable: true),
                    Avaliacao = table.Column<int>(type: "int", nullable: false, defaultValue: 3),
                    DataExpurgo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TituloOutro = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    UltimoAcesso = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cadernos", x => x.CadernoId);
                });
        }
    }
}
