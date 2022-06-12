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
        public string loginTeacher { get; set; }
        public string passwordTeacher { get; set; }
        public string nameTeacher { get; set; }
        public string surnameTeacher { get; set; }
        public long birthdayTeacher { get; set; }
        public string emailTeacher { get; set; }
        public string phoneTeacher { get; set; }
        public string subjectTeacher { get; set; }
    }
}
