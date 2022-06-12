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
        public int idPupil { get; set; }
        public int idTask { get; set; }
        public int gradeAnswer { get; set; }
        public int idMaterial { get; set; }
        public string fastAnswer { get; set; }
    }
}
