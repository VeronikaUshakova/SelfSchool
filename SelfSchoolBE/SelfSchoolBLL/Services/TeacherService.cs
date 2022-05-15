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
    public class TeacherService
    {
        EFUnitOfWork Database = new EFUnitOfWork();
        Hash Hash = new Hash();

        public async Task<List<Teacher>> GetALLTeachers()
        {
            List<Teacher> teachers = await Database.Teachers.GetAll();
            return teachers;
        }

        public Teacher GetTeacher(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var teacher = Database.Teachers.Get(id.Value);
            if (teacher == null)
                throw new ValidationException("Teacher not found");
            return teacher;
        }
        List<Teacher> FindTeacher(Func<Teacher, Boolean> predicate)
        {
            return Database.Teachers.Find(predicate);
        }
        public void CreateTeacher(Teacher teacher)
        {
            if (teacher == null)
            {
                throw new ValidationException("Invalid data");
            }
            teacher.loginTeacher = Hash.GetHashString(teacher.loginTeacher);
            teacher.passwordTeacher = Hash.GetHashString(teacher.passwordTeacher);
            Database.Teachers.Create(teacher);
        }
        public void UpdateTeacher(Teacher teacher)
        {
            if (teacher == null)
            {
                throw new ValidationException("Invalid data");
            }
            teacher.loginTeacher = Hash.GetHashString(teacher.loginTeacher);
            teacher.passwordTeacher = Hash.GetHashString(teacher.passwordTeacher);
            Database.Teachers.Update(teacher);
        }
        public void DeleteTeacher(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var teacher = Database.Teachers.Get(id.Value);
            if (teacher == null)
                throw new ValidationException("Pupil not found");
            Database.Teachers.Delete(id.Value);
        }

        public Boolean CheckTeacher(string login, string password)
        {
            if ((password == null) || (login == null))
            {
                throw new ValidationException("Invalid data");
            }
            Teacher teacher = Database.Teachers.GetByLoginPassword(login, password);
            if (teacher.passwordTeacher == Hash.GetHashString(password) && teacher.loginTeacher == Hash.GetHashString(login))
            {
                return true;
            }
            return false;
        }
    }
}
