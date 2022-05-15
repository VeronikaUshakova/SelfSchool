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
    public class ClassSchoolService
    {
        EFUnitOfWork Database = new EFUnitOfWork();

        public async Task<List<ClassSchool>> GetALLClassSchool()
        {
            List<ClassSchool> classes = await Database.ClassSchools.GetAll();
            return classes;
        }

        public ClassSchool GetClassSchool(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var classSchool = Database.ClassSchools.Get(id.Value);
            if (classSchool == null)
                throw new ValidationException("Class not found");
            return classSchool;
        }
        List<ClassSchool> FindClassSchool(Func<ClassSchool, Boolean> predicate)
        {
            return Database.ClassSchools.Find(predicate);
        }
        public void CreateClassSchool(ClassSchool classSchool)
        {
            if (classSchool == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.ClassSchools.Create(classSchool);
        }
        public void UpdateClassSchool(ClassSchool classSchool)
        {
            if (classSchool == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.ClassSchools.Update(classSchool);
        }
        public void DeleteClassSchool(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var classSchool = Database.ClassSchools.Get(id.Value);
            if (classSchool == null)
                throw new ValidationException("Class not found");
            Database.ClassSchools.Delete(id.Value);
        }
    }
}
