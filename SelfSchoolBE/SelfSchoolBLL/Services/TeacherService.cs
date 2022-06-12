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

            var parents = Database.Parents.Find(p => (p.loginParent == teacher.loginTeacher) ||
            (p.emailParent == teacher.emailTeacher) || (p.phoneParent == teacher.phoneTeacher));

            var pupils = Database.Pupils.Find(p => (p.loginPupil == teacher.loginTeacher) ||
            (p.emailPupil == teacher.emailTeacher) || (p.phonePupil == teacher.phoneTeacher));

            var teachers = FindTeacher(t => (t.loginTeacher == teacher.loginTeacher) ||
            (t.emailTeacher == teacher.emailTeacher) || (t.phoneTeacher == teacher.phoneTeacher));

            var admins = Database.Admins.Find(a => (a.login == teacher.loginTeacher));

            if ((parents.Count > 0) || (pupils.Count > 0) || (teachers.Count > 0) || (admins.Count > 0))
            {
                throw new ValidationException("This login, email or phone already exists");
            }

            Database.Teachers.Create(teacher);
        }
        public void UpdateTeacher(Teacher teacher)
        {
            if (teacher == null)
            {
                throw new ValidationException("Invalid data");
            }

            var currentTeacher = FindTeacher(curT => curT.idTeacher == teacher.idTeacher);

            if (currentTeacher[0].loginTeacher != teacher.loginTeacher)
            {
                teacher.loginTeacher = Hash.GetHashString(teacher.loginTeacher);
            }

            if (currentTeacher[0].passwordTeacher != teacher.passwordTeacher)
            {
                teacher.passwordTeacher = Hash.GetHashString(teacher.passwordTeacher);
            }

            if (teacher.loginTeacher == currentTeacher[0].loginTeacher &&
                teacher.passwordTeacher == currentTeacher[0].passwordTeacher &&
                teacher.nameTeacher == currentTeacher[0].nameTeacher &&
                teacher.surnameTeacher == currentTeacher[0].surnameTeacher &&
                teacher.phoneTeacher == currentTeacher[0].phoneTeacher &&
                teacher.emailTeacher == currentTeacher[0].emailTeacher &&
                teacher.birthdayTeacher == currentTeacher[0].birthdayTeacher &&
                teacher.subjectTeacher == currentTeacher[0].subjectTeacher)
            {
                throw new ValidationException("You didn't change anything");
            }

            var parents = Database.Parents.Find(p => (p.loginParent == teacher.loginTeacher) &&
            (p.emailParent == teacher.emailTeacher) || (p.phoneParent == teacher.phoneTeacher));

            var pupils = Database.Pupils.Find(p => (p.loginPupil == teacher.loginTeacher) ||
            (p.emailPupil == teacher.emailTeacher) || (p.phonePupil == teacher.phoneTeacher));

            var teachers = FindTeacher(t => (t.loginTeacher == teacher.loginTeacher &&
            t.idTeacher != teacher.idTeacher) || (t.emailTeacher == teacher.emailTeacher && 
            t.idTeacher != teacher.idTeacher) || (t.phoneTeacher == teacher.phoneTeacher &&
            t.idTeacher != teacher.idTeacher));

            var admins = Database.Admins.Find(a => (a.login == teacher.loginTeacher));

            if ((parents.Count > 0) || (pupils.Count > 0) || (teachers.Count > 0) || (admins.Count > 0))
            {
                throw new ValidationException("This login, email or phone already exists");
            }

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
            Teacher teacher = Database.Teachers.GetByLoginPassword(login, password)[0];
            if (teacher.passwordTeacher == Hash.GetHashString(password) && teacher.loginTeacher == Hash.GetHashString(login))
            {
                return true;
            }
            return false;
        }
    }
}
