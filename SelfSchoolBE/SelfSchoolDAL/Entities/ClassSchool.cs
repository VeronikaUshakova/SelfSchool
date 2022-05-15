﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Entities
{
    public class ClassSchool
    {
        [Key]
        public int idClass { get; set; }
        [Required]
        [ForeignKey("idTeacher")]
        public ICollection<Teacher> teachers { get; set; }
        [Required]
        public int numberClass { get; set; }
        [Required]
        public int letterClass { get; set; }
    }
}