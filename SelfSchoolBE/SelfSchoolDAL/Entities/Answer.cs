using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SelfSchoolDAL.Entities
{
    public class Answer
    {
        [Key]
        public int idAnswer { get; set; }
        [Required]
        [ForeignKey("idPupil")]
        public ICollection<Pupil> pupils{ get; set; }
        [Required]
        [ForeignKey("idTask")]
        public ICollection<TaskLesson> tasks{ get; set; }
        public int gradeAnswer { get; set; }
        public byte fileAnswer { get; set; }
        public string fastAnswer { get; set; }
    }
}
