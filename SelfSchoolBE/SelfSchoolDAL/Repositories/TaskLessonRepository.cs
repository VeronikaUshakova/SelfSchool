using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.DataContext;
using SelfSchoolDAL.Entities;
using SelfSchoolDAL.Interfaces;

namespace SelfSchoolDAL.Repositories
{
    public class TaskLessonRepository : TaskLessonInterface
    {
        private DatabaseContext context;
        public TaskLessonRepository(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task<List<TaskLesson>> GetAll()
        {
            List<TaskLesson> taskLessons = new List<TaskLesson>();
            taskLessons = await context.TaskLessons.ToListAsync();
            return taskLessons;
        }
        public TaskLesson Get(int id)
        {
            TaskLesson taskLesson = new TaskLesson();
            taskLesson = context.TaskLessons.Find(id);
            return taskLesson;
        }
        public List<TaskLesson> Find(Func<TaskLesson, Boolean> predicate)
        {
            List<TaskLesson> taskLessons = new List<TaskLesson>();
            taskLessons = context.TaskLessons.Where(predicate).ToList();
            return taskLessons;
        }
        public void Create(TaskLesson taskLesson)
        {
            context.TaskLessons.Add(taskLesson);
            context.SaveChanges();
        }
        public void Update(TaskLesson taskLesson)
        {
            var currentTaskLesson = context.TaskLessons.Find(taskLesson.idTask);
            context.Entry(currentTaskLesson).CurrentValues.SetValues(taskLesson);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            TaskLesson taskLesson = context.TaskLessons.Find(id);
            if (taskLesson != null)
            {
                context.TaskLessons.Remove(taskLesson);
                context.SaveChanges();
            }
        }
        public DatabaseFacade ContextConnection()
        {
            return context.Database;
        }
    }
}
