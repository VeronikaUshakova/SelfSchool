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

            for (var i = taskLessons.Count - 1; i >= 0; i--) 
            {
                var lesson = Database.Lessons.Get(taskLessons[i].idLesson);
                var material = Database.Materials.Get(taskLessons[i].idMaterial);

                if (lesson == null || material == null) 
                {
                    Database.TaskLessons.Delete(taskLessons[i].idTask);
                }
            }

            taskLessons = await Database.TaskLessons.GetAll();

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

            var lesson = Database.Lessons.Get(taskLesson.idLesson);
            if (lesson == null)
            {
                throw new ValidationException("This lesson not found");
            }

            var material = Database.Materials.Get(taskLesson.idMaterial);
            if (material == null)
            {
                throw new ValidationException("This material not found");
            }

            Database.TaskLessons.Create(taskLesson);
        }
        public void UpdateTaskLesson(TaskLesson taskLesson)
        {
            if (taskLesson == null)
            {
                throw new ValidationException("Invalid data");
            }

            var currentTask = FindTaskLesson(curT => curT.idTask == taskLesson.idTask);

            if (taskLesson.idLesson == currentTask[0].idLesson
                && taskLesson.nameTask == currentTask[0].nameTask
                && taskLesson.descriptionTask == currentTask[0].descriptionTask
                && taskLesson.dateTask == currentTask[0].dateTask
                && taskLesson.idMaterial == currentTask[0].idMaterial)
            {
                throw new ValidationException("You didn't change anything");
            }

            var lesson = Database.Lessons.Get(taskLesson.idLesson);
            if (lesson == null)
            {
                throw new ValidationException("This lesson not found");
            }

            var material = Database.Materials.Get(taskLesson.idMaterial);
            if (material == null)
            {
                throw new ValidationException("This material not found");
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
