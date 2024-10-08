﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AirBnb.Core.Domain.Content
{
    [Table("BookRooms")]
    public class BookRooms
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public string RoomName { get; set; }
        public Guid AuthorUserId { get; set; }
        public string AuthorUserName { get; set; }
        public string AuthorName { get; set; }
        public DateTime DateCheckIn { get; set; }
        public DateTime DateCheckout { get; set; }
        public int GuestNumber { get; set; }
        [Required]
        [MaxLength(250)]
        public string Note { get; set; }
        public string? ImageRoom { get; set; }
        public BookRoomStatus Status { get; set; }
        public bool IsPaid { get; set; }
        public int PayRoomAmount { get; set; }
        public DateTime? PaidDate { get; set; }
        public enum BookRoomStatus
        {
            Draft = 0,
            WaitingForApproval = 1,
            Rejected = 2,
            Approve = 3,
        }
    }
}
