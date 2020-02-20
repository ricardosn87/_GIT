using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore_Configuracao2.Migrations
{
    public partial class temp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Autors",
                columns: table => new
                {
                    AutorId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Autors", x => x.AutorId);
                });

            migrationBuilder.CreateTable(
                name: "Livros",
                columns: table => new
                {
                    LivroId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulo = table.Column<string>(nullable: true),
                    AutorFK = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Livros", x => x.LivroId);
                    table.ForeignKey(
                        name: "FK_Livros_Autors_AutorFK",
                        column: x => x.AutorFK,
                        principalTable: "Autors",
                        principalColumn: "AutorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Livros_AutorFK",
                table: "Livros",
                column: "AutorFK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Livros");

            migrationBuilder.DropTable(
                name: "Autors");
        }
    }
}
