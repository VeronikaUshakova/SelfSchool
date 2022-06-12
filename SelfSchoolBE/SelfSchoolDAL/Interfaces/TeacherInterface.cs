using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Interfaces
{
    public interface TeacherInterface
    {
        Task<List<Teacher>> GetAll();
        Teacher Get(int id);
        List<Teacher> GetByLoginPassword(string logon, string password);
        List<Teacher> Find(Func<Teacher, Boolean> predicate);
        void Create(Teacher item);
        void Update(Teacher item);
        void Delete(int id);
        DatabaseFacade ContextConnection();
    }
}
