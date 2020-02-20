using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore_ChaveEstrangeira.Migrations
{
    public partial class inicio : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alunos",
                columns: table => new
                {
                    AlunoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alunos", x => x.AlunoId);
                });

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
                name: "Equipamentos",
                columns: table => new
                {
                    EquipamentoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Local = table.Column<string>(nullable: true),
                    AlunoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipamentos", x => x.EquipamentoId);
                    table.ForeignKey(
                        name: "FK_Equipamentos_Alunos_AlunoId",
                        column: x => x.AlunoId,
                        principalTable: "Alunos",
                        principalColumn: "AlunoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Livros",
                columns: table => new
                {
                    LivroId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(nullable: true),
                    EscritorAutorId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Livros", x => x.LivroId);
                    table.ForeignKey(
                        name: "FK_Livros_Autors_EscritorAutorId",
                        column: x => x.EscritorAutorId,
                        principalTable: "Autors",
                        principalColumn: "AutorId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Equipamentos_AlunoId",
                table: "Equipamentos",
                column: "AlunoId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Livros_EscritorAutorId",
                table: "Livros",
                column: "EscritorAutorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Equipamentos");

            migrationBuilder.DropTable(
                name: "Livros");

            migrationBuilder.DropTable(
                name: "Alunos");

            migrationBuilder.DropTable(
                name: "Autors");
        }
    }
}
