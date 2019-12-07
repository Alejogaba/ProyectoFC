using Microsoft.EntityFrameworkCore.Migrations;
using Oracle.EntityFrameworkCore.Metadata;

namespace FcProyecto.Migrations
{
    public partial class CxCuentas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CHART",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Oracle:ValueGenerationStrategy", OracleValueGenerationStrategy.IdentityColumn),
                    ACCNO = table.Column<string>(nullable: true),
                    DESCRIPTION = table.Column<string>(nullable: true),
                    CHARTTYPE = table.Column<string>(nullable: true),
                    CATEGORY = table.Column<string>(nullable: true),
                    LINK = table.Column<string>(nullable: true),
                    GIFI_ACCNO = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CHART", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CHART");
        }
    }
}
