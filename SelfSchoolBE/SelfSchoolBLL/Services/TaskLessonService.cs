using Microsoft.EntityFrameworkCore;
using SelfSchoolBLL.Infrastructure;
using SelfSchoolDAL.Entities;
using SelfSchoolDAL.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolBLL.Services
{
    public class TaskLessonService
    {
        EFUnitOfWork Database = new EFUnitOfWork();

        public async Task<List<TaskLesson>> GetALLTaskLessons() { 
            List<TaskLesson> taskLessons = await Database.TaskLessons.GetAll();
            return taskLessons;
        }

        public TaskLesson GetTaskLesson(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var taskLesson = Database.TaskLessons.Get(id.Value);
            if (taskLesson == null)
                throw new ValidationException("Task not found");
            return taskLesson;
        }
        List<TaskLesson> FindTaskLesson(Func<TaskLesson, Boolean> predicate)
        {
            return Database.TaskLessons.Find(predicate);
        }
        public void CreateTaskLesson(TaskLesson taskLesson)
        {
            if (taskLesson == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.TaskLessons.Create(taskLesson);
        }
        public void UpdateTaskLesson(TaskLesson taskLesson)
        {
            if (taskLesson == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.TaskLessons.Update(taskLesson);
        }
        public void DeleteTaskLesson(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var taskLesson = Database.TaskLessons.Get(id.Value);
            if (taskLesson == null)
                throw new ValidationException("Task not found");
            Database.TaskLessons.Delete(id.Value);
        }
    }
}
