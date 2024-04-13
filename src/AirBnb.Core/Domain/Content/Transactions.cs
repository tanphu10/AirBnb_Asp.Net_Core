using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Domain.Content
{
    [Table("Transactions")]
    public class Transaction
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(250)]
        [Required]
        public required string FromUserName { get; set; }
        public Guid FromUserId { get; set; }
        public Guid ToOwnerId { get; set; }

        [MaxLength(250)]
        [Required]
        public required string ToOwnerName { get; set; }
        public double Amount { get; set; }
        public TransactionType TransactionType { get; set; }
        public DateTime DateCreated { get; set; }

        [MaxLength(250)]
        public string? Note { get; set; }
    }
}
public enum TransactionType
{
    RoomPay
}