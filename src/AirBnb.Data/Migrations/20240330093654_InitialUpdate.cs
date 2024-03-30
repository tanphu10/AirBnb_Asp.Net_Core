using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirBnb.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PostId",
                table: "RoomActivityLogs",
                newName: "RooId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RooId",
                table: "RoomActivityLogs",
                newName: "PostId");
        }
    }
}
