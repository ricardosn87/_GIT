using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore_CodeFirst_PopulaDB.Migrations
{
    public partial class SeedDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO PRODUTOS (PRODUTONOME,PRODUTOESTOQUE,PRODUTOPRECO) VALUES ('ESTOJO',80,6.99)");
            migrationBuilder.Sql("INSERT INTO PRODUTOS (PRODUTONOME,PRODUTOESTOQUE,PRODUTOPRECO) VALUES ('ESTOJO2',80,6.99)");
            migrationBuilder.Sql("INSERT INTO PRODUTOS (PRODUTONOME,PRODUTOESTOQUE,PRODUTOPRECO) VALUES ('ESTOJO3',80,6.99)");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM PRODUTOS");
        }
    }
}
