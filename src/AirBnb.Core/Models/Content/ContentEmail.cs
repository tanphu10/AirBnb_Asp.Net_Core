using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Models.Content
{
    public class ContentEmail
    {
        public string Body { get; set; }
        public string Subject { get; set; }
        public IEnumerable<string> ToAddresses { get; set; }

    }
}
