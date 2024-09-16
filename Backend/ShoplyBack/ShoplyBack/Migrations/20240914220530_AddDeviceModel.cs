using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShoplyBack.Migrations
{
    public partial class AddDeviceModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeviceModelId",
                table: "Products",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DeviceModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specifications = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeviceModels_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_DeviceModelId",
                table: "Products",
                column: "DeviceModelId");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceModels_CategoryId",
                table: "DeviceModels",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_DeviceModels_DeviceModelId",
                table: "Products",
                column: "DeviceModelId",
                principalTable: "DeviceModels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_DeviceModels_DeviceModelId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "DeviceModels");

            migrationBuilder.DropIndex(
                name: "IX_Products_DeviceModelId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "DeviceModelId",
                table: "Products");
        }
    }
}
