using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Entities
{
    public class Teacher
    {
        [Key]
        public int idTeacher { get; set; }
        [Required]
        public string loginTeacher { get; set; }
        [Required]
        public string passwordTeacher { get; set; }
        [Required]
        public string nameTeacher { get; set; }
        [Required]
        public string surnameTeacher { get; set; }
        [Required]
        public int birthdayTeacher { get; set; }
        [Required]
        public string emailTeacher { get; set; }
        public string phoneTeacher { get; set; }
        [Required]
        public string subjectTeacher { get; set; }
    }
}
