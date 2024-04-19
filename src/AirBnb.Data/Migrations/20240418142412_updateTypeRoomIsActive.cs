using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirBnb.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateTypeRoomIsActive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "TypeRooms",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "TypeRooms");
        }
    }
}
