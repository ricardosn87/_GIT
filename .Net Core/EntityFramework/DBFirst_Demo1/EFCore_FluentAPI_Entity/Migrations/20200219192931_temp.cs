using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore_FluentAPI_Entity.Migrations
{
    public partial class temp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cadernos",
                columns: table => new
                {
                    CadernoId = table.Column<int>(nullable: false),
                    TituloOutro = table.Column<string>(maxLength: 150, nullable: false),
                    AutorCaderno = table.Column<string>(type: "varchar(100)", nullable: true),
                    Avaliacao = table.Column<int>(nullable: false, defaultValue: 3),
                    DataExpurgo = table.Column<DateTime>(nullable: false),
                    UltimoAcesso = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cadernos", x => x.CadernoId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cadernos");
        }
    }
}
