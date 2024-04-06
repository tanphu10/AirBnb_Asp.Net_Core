using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirBnb.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBookRoomFeilds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "BookRooms",
                newName: "AuthorUserId");

            migrationBuilder.AddColumn<string>(
                name: "AuthorName",
                table: "BookRooms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AuthorUserName",
                table: "BookRooms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "BookRooms",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RoomName",
                table: "BookRooms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "BookRooms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "BookRooms",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorName",
                table: "BookRooms");

            migrationBuilder.DropColumn(
                name: "AuthorUserName",
                table: "BookRooms");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "BookRooms");

            migrationBuilder.DropColumn(
                name: "RoomName",
                table: "BookRooms");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "BookRooms");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "BookRooms");

            migrationBuilder.RenameColumn(
                name: "AuthorUserId",
                table: "BookRooms",
                newName: "UserId");
        }
    }
}
