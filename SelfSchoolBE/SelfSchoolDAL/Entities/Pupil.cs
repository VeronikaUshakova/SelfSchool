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
        public string loginPupil { get; set; }
        public string passwordPupil { get; set; }
        public string namePupil { get; set; }
        public string surnamePupil { get; set; }
        public long birthdayPupil { get; set; }
        public string emailPupil { get; set; }
        public string phonePupil { get; set; }
        [Required]
        public int idClass { get; set; }
    }
}
