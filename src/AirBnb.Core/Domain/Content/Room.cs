using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AirBnb.Core.Domain.Content
{
    [Table("Rooms")]
    [Index(nameof(Slug), IsUnique = true)]
    public class Room
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(250)]
        public required string Name { get; set; }
        [Required]
        [Column(TypeName = "varchar(250)")]
        public required string Slug { get; set; }
        [Required]
        public required int Guest { get; set; }
        [MaxLength(500)]
        public required string Description { get; set; }
        [MaxLength(160)]
        public string? SeoDescription { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategorySlug { get; set; }
        public string AuthorName { get; set; }
        public string AuthorUserName { get; set; }
        public string AuthorUserId { get; set; }
        public Guid LocateId { get; set; }
        [MaxLength(250)]
        public string? Tags { get; set; }
        public int BedRoom { get; set; }
        public int BathRoom { get; set; }
        public int Price { get; set; }
        public bool WashMachine { get; set; }
        public bool IronCloth { get; set; }
        public bool Televison { get; set; }
        public bool AirCondirioner { get; set; }
        public bool Wifi { get; set; }
        public bool Kitchen { get; set; }
        public bool Pool { get; set; }
        public bool Park { get; set; }
        [MaxLength(500)]
        public string? Photo { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public int ViewCount { get; set; }
    }
    public enum RoomStatus
    {
        Draft = 1,
        Canceled = 2,
        WaitingForApproval = 3,
        Rejected = 4,
        WaitingForPublish = 5,
        Published = 6
    }
}
