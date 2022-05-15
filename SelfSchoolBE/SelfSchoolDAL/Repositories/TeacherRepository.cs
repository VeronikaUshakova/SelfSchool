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
    public class TeacherRepository : TeacherInterface
    {
        private DatabaseContext context;
        public TeacherRepository(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task<List<Teacher>> GetAll()
        {
            List<Teacher> teachers = new List<Teacher>();
            teachers = await context.Teachers.ToListAsync();
            return teachers;
        }
        public Teacher Get(int id)
        {
            Teacher teacher = new Teacher();
            teacher = context.Teachers.Find(id);
            return teacher;
        }
        public Teacher GetByLoginPassword(string login, string password)
        {
            Teacher teacher = new Teacher();
            teacher = context.Teachers.Find(login, password);
            return teacher;
        }
        public List<Teacher> Find(Func<Teacher, Boolean> predicate)
        {
            List<Teacher> teachers = new List<Teacher>();
            teachers = context.Teachers.Where(predicate).ToList();
            return teachers;
        }
        public void Create(Teacher teacher)
        {
            context.Teachers.Add(teacher);
            context.SaveChanges();
        }
        public void Update(Teacher teacher)
        {
            var currentTeacher = context.Teachers.Find(teacher.idTeacher);
            context.Entry(currentTeacher).CurrentValues.SetValues(teacher);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            Teacher teacher = context.Teachers.Find(id);
            if (teacher != null)
            {
                context.Teachers.Remove(teacher);
                context.SaveChanges();
            }
        }
        public DatabaseFacade ContextConnection()
        {
            return context.Database;
        }
    }
}
