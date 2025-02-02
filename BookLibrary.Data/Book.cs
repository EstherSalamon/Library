using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Data
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int TotalAmt { get; set; }
        public string BackText { get; set; }
        public string Tags { get; set; }
        [NotMapped]
        public List<string> TagsList { get; set; }
    }
}
