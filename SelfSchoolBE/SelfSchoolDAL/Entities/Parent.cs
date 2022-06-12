using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Entities
{
    public class Parent
    {
        [Key]
        public int idParent { get; set; }
        public string loginParent { get; set; }
        public string passwordParent { get; set; }
        public string nameParent { get; set; }
        public string surnameParent { get; set; }
        public long birthdayParent { get; set; }
        public string emailParent { get; set; }
        public string phoneParent { get; set; }
    }
}
