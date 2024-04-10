using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirBnb.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateLocationIsActiveLoalcase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "province",
                table: "Locations",
                newName: "Province");

            migrationBuilder.RenameColumn(
                name: "district",
                table: "Locations",
                newName: "District");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Province",
                table: "Locations",
                newName: "province");

            migrationBuilder.RenameColumn(
                name: "District",
                table: "Locations",
                newName: "district");
        }
    }
}
