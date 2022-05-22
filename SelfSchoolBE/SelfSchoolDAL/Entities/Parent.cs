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
        [Required]
        public string loginParent { get; set; }
        [Required]
        public string passwordParent { get; set; }
        [Required]
        public string nameParent { get; set; }
        [Required]
        public string surnameParent { get; set; }
        [Required]
        public long birthdayParent { get; set; }
        [Required]
        public string emailParent { get; set; }
        public string phoneParent { get; set; }
    }
}
