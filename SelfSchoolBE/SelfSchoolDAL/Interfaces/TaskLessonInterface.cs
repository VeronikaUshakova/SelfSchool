using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Interfaces
{
    public interface TaskLessonInterface
    {
        Task<List<TaskLesson>> GetAll();
        TaskLesson Get(int id);
        List<TaskLesson> Find(Func<TaskLesson, Boolean> predicate);
        void Create(TaskLesson item);
        void Update(TaskLesson item);
        void Delete(int id);
        DatabaseFacade ContextConnection();
    }
}
