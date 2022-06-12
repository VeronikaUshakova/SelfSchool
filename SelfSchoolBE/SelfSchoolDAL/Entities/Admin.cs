using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Entities
{
    public class Admin
    {
        [Key]
        public int idAdmin { get; set; }
        public string login { get; set; }
        public string password { get; set; }
    }
}
