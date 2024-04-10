using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Domain.Content
{
    [Table("Locations")]
    public class Location
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(250)]
        [Required]
        public required string Name { get; set; }
        [MaxLength(250)]
        public string District { get; set; }

        [MaxLength(250)]
        public string Province { get; set; }

        [Column(TypeName = "varchar(250)")]
        public string Slug { get; set; }
        public string Nation { get; set; }
        [MaxLength(250)]
        public string? Thumbnail { set; get; }
        public bool IsActive { set; get; }
    }
}
