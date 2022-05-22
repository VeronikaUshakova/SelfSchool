using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SelfSchoolDAL.Entities
{
    public class Pupil
    {
        [Key]
        public int idPupil { get; set; }
        [Required]
        public string loginPupil { get; set; }
        [Required]
        public string passwordPupil { get; set; }
        [Required]
        public string namePupil { get; set; }
        [Required]
        public string surnamePupil { get; set; }
        [Required]
        public long birthdayPupil { get; set; }
        [Required]
        public string emailPupil { get; set; }
        public string phonePupil { get; set; }
        [Required]
        public int idClass { get; set; }
    }
}
