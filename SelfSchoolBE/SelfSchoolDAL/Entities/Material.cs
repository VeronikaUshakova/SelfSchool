using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Entities
{
    public class Material
    {
        [Key]
        public int idMaterial { get; set; }
        public string urlMaterial { get; set; }
        public string fileMaterial { get; set; }
    }
}
