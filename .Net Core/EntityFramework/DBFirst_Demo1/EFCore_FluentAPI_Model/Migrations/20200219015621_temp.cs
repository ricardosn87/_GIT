using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore_FluentAPI_Model.Migrations
{
    public partial class temp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Admin");

            migrationBuilder.CreateTable(
                name: "Autores",
                schema: "Admin",
                columns: table => new
                {
                    AutorId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Autores", x => x.AutorId);
                });

            migrationBuilder.CreateTable(
                name: "Livross",
                schema: "Admin",
                columns: table => new
                {
                    LivroId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Livross", x => x.LivroId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Autores",
                schema: "Admin");

            migrationBuilder.DropTable(
                name: "Livross",
                schema: "Admin");
        }
    }
}
