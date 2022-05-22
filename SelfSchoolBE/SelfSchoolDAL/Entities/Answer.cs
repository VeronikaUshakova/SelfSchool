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
        public int idPupil { get; set; }
        [Required]
        public int idTask { get; set; }
        public int gradeAnswer { get; set; }
        public byte fileAnswer { get; set; }
        public string fastAnswer { get; set; }
    }
}
