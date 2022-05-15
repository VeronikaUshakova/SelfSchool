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
    public class LessonService
    {
        EFUnitOfWork Database = new EFUnitOfWork();

        public async Task<List<Lesson>> GetALLLessons() { 
            List<Lesson> lessons = await Database.Lessons.GetAll();
            return lessons;
        }

        public Lesson GetLesson(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var lesson = Database.Lessons.Get(id.Value);
            if (lesson == null)
                throw new ValidationException("Lesson not found");
            return lesson;
        }
        List<Lesson> FindLesson(Func<Lesson, Boolean> predicate)
        {
            return Database.Lessons.Find(predicate);
        }
        public void CreateLesson(Lesson lesson)
        {
            if (lesson == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.Lessons.Create(lesson);
        }
        public void UpdateLesson(Lesson lesson)
        {
            if (lesson == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.Lessons.Update(lesson);
        }
        public void DeleteLesson(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var lesson = Database.Lessons.Get(id.Value);
            if (lesson == null)
                throw new ValidationException("Lesson not found");
            Database.Lessons.Delete(id.Value);
        }
    }
}
