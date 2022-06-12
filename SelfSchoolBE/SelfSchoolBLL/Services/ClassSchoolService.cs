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

            var classSchools = FindClassSchool(cs => cs.letterClass == classSchool.letterClass &&
                cs.numberClass == classSchool.numberClass);

            if (classSchools.Count != 0)
            {
                throw new ValidationException("This class already exists");
            }

            Database.ClassSchools.Create(classSchool);
        }
        public void UpdateClassSchool(ClassSchool classSchool)
        {
            if (classSchool == null)
            {
                throw new ValidationException("Invalid data");
            }

            var currentClassSchool = FindClassSchool(curClass => curClass.idClass == classSchool.idClass);
            
            if (currentClassSchool[0].letterClass == classSchool.letterClass &&
                currentClassSchool[0].numberClass == classSchool.numberClass)
            {
                throw new ValidationException("You didn't change anything");
            }

            var classSchools = FindClassSchool(cs => cs.letterClass == classSchool.letterClass &&
                cs.numberClass == classSchool.numberClass && cs.idClass != classSchool.idClass);

            if (classSchools.Count != 0)
            {
                throw new ValidationException("This class already exists");
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
