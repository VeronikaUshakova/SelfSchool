using System.Collections.Generic;

namespace SelfSchoolDAL.Entities
{
    public class Family_ext
    {
        public int idFamily { get; set; }
        public List<int> parents { get; set; }
        public List<int> pupils { get; set; }
    }
}
