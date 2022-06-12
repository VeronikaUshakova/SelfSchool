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
        public int idParent { get; set; }
        public int idPupil { get; set; }
    }
}
