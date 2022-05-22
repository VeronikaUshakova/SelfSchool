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
        [Required]
        public int idLesson { get; set; }
        [Required]
        public string nameTask { get; set; }
        [Required]
        public string descriptionTask { get; set; }
        [Required]
        public int dateTask { get; set; }
        public int idMaterial { get; set; }
    }
}
