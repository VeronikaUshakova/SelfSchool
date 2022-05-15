using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Entities
{
    public class Family
    {
        [Key]
        public int idFamily { get; set; }
        [Required]
        [ForeignKey("idParent")]
        public ICollection<Parent> parents { get; set; }
        [Required]
        [ForeignKey("idPupil")]
        public ICollection<Pupil> pupils { get; set; }
    }
}
