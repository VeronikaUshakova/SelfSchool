using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Entities
{
    public class TaskLesson
    {
        [Key]
        public int idTask { get; set; }
        public int idLesson { get; set; }
        public string nameTask { get; set; }
        public string descriptionTask { get; set; }
        public long dateTask { get; set; }
        public int idMaterial { get; set; }
    }
}
