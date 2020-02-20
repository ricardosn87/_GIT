using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore_Relacionamentos1.Migrations
{
    public partial class temp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cursos",
                columns: table => new
                {
                    CodCurso = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CursoNome = table.Column<string>(nullable: true),
                    Descricao = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cursos", x => x.CodCurso);
                });

            migrationBuilder.CreateTable(
                name: "Estudantes",
                columns: table => new
                {
                    CodEstudante = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estudantes", x => x.CodEstudante);
                });

            migrationBuilder.CreateTable(
                name: "EstudanteCursos",
                columns: table => new
                {
                    CodEstudante = table.Column<int>(nullable: false),
                    CodCurso = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstudanteCursos", x => new { x.CodCurso, x.CodEstudante });
                    table.ForeignKey(
                        name: "FK_EstudanteCursos_Cursos_CodCurso",
                        column: x => x.CodCurso,
                        principalTable: "Cursos",
                        principalColumn: "CodCurso",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EstudanteCursos_Estudantes_CodEstudante",
                        column: x => x.CodEstudante,
                        principalTable: "Estudantes",
                        principalColumn: "CodEstudante",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EstudanteCursos_CodEstudante",
                table: "EstudanteCursos",
                column: "CodEstudante");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EstudanteCursos");

            migrationBuilder.DropTable(
                name: "Cursos");

            migrationBuilder.DropTable(
                name: "Estudantes");
        }
    }
}
