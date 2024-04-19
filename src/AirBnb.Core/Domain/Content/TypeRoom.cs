using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Domain.Content
{
    [Table("TypeRooms")]
    [Index(nameof(Slug), IsUnique = true)]
    public class TypeRoom
    {
        public Guid Id { get; set; }
        [Required]
        [MaxLength(250)]
        public  string  TypeName { get; set; }
        public string Image { get; set; }
        [Required]
        [Column(TypeName = "varchar(250)")]
        public string Slug { get; set; }
        public bool IsActive { set; get; }


    }
}
