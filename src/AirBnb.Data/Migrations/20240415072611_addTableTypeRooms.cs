using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirBnb.Data.Migrations
{
    /// <inheritdoc />
    public partial class addTableTypeRooms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TypeId",
                table: "Rooms",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TypeRooms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TypeName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Slug = table.Column<string>(type: "varchar(250)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeRooms", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TypeRooms_Slug",
                table: "TypeRooms",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TypeRooms");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Rooms");
        }
    }
}
