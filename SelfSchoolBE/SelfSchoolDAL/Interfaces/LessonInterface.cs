using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Interfaces
{
    public interface LessonInterface
    {
        Task<List<Lesson>> GetAll();
        Lesson Get(int id);
        List<Lesson> Find(Func<Lesson, Boolean> predicate);
        void Create(Lesson item);
        void Update(Lesson item);
        void Delete(int id);
        DatabaseFacade ContextConnection();
    }
}
