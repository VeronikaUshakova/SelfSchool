using System;
using System.Collections.Generic;
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
    public class LessonRepository : LessonInterface
    {
        private DatabaseContext context;
        public LessonRepository(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task<List<Lesson>> GetAll()
        {
            List<Lesson> lessons = new List<Lesson>();
            lessons = await context.Lessons.ToListAsync();
            return lessons;
        }
        public Lesson Get(int id)
        {
            Lesson lesson = new Lesson();
            lesson = context.Lessons.Find(id);
            return lesson;
        }
        public List<Lesson> Find(Func<Lesson, Boolean> predicate)
        {
            List<Lesson> lessons = new List<Lesson>();
            lessons = context.Lessons.Where(predicate).ToList();
            return lessons;
        }
        public void Create(Lesson lesson)
        {
            context.Lessons.Add(lesson);
            context.SaveChanges();
        }
        public void Update(Lesson lesson)
        {
            var currentLesson = context.Lessons.Find(lesson.idLesson);
            context.Entry(currentLesson).CurrentValues.SetValues(lesson);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            Lesson lesson = context.Lessons.Find(id);
            if (lesson != null)
            {
                context.Lessons.Remove(lesson);
                context.SaveChanges();
            }
        }

        public DatabaseFacade ContextConnection()
        {
            return context.Database;
        }
    }
}
