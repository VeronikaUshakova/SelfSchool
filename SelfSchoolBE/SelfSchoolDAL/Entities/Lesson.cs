using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SelfSchoolDAL.Entities
{
    public class Lesson
    {
        [Key]
        public int idLesson { get; set; }
        public string nameLesson { get; set; }
        public int idTeacher{get; set;}
        public long dateLesson { get; set; }

    }
}
