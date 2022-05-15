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
    public class ClassSchoolRepository : ClassSchoolInterface
    {
        private DatabaseContext context;
        public ClassSchoolRepository(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task<List<ClassSchool>> GetAll()
        {
            List<ClassSchool> classSchools = new List<ClassSchool>();
            classSchools = await context.ClassSchools.ToListAsync();
            return classSchools;
        }
        public ClassSchool Get(int id)
        {
            ClassSchool classSchool = new ClassSchool();
            classSchool = context.ClassSchools.Find(id);
            return classSchool;
        }
        public List<ClassSchool> Find(Func<ClassSchool, Boolean> predicate)
        {
            List<ClassSchool> classSchools = new List<ClassSchool>();
            classSchools = context.ClassSchools.Where(predicate).ToList();
            return classSchools;
        }
        public void Create(ClassSchool classSchool)
        {
            context.ClassSchools.Add(classSchool);
            context.SaveChanges();
        }
        public void Update(ClassSchool classSchool)
        {
            var currentClassSchool= context.ClassSchools.Find(classSchool.idClass);
            context.Entry(currentClassSchool).CurrentValues.SetValues(classSchool);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            ClassSchool classSchool = context.ClassSchools.Find(id);
            if (classSchool != null)
            {
                context.ClassSchools.Remove(classSchool);
                context.SaveChanges();
            }
        }
        public DatabaseFacade ContextConnection()
        {
            return context.Database;
        }
    }
}
