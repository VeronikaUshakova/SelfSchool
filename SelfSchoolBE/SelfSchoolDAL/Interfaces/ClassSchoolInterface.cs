using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Interfaces
{
    public interface ClassSchoolInterface
    {
        Task<List<ClassSchool>> GetAll();
        ClassSchool Get(int id);
        List<ClassSchool> Find(Func<ClassSchool, Boolean> predicate);
        void Create(ClassSchool item);
        void Update(ClassSchool item);
        void Delete(int id);
        DatabaseFacade ContextConnection();
    }
}
