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
    public class PupilService
    {
        EFUnitOfWork Database = new EFUnitOfWork();
        Hash Hash = new Hash();

        public async Task<List<Pupil>> GetALLPupils()
        {
            List<Pupil> pupils = await Database.Pupils.GetAll();

            for (int i = pupils.Count - 1; i >= 0; i--) 
            {
                var classSchool = Database.ClassSchools.Get(pupils[i].idClass);
                if (classSchool == null) 
                {
                    Database.Pupils.Delete(pupils[i].idPupil);
                }
            }

            return pupils;
        }

        public Pupil GetPupil(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var pupil = Database.Pupils.Get(id.Value);
            if (pupil == null)
                throw new ValidationException("Pupil not found");
            return pupil;
        }
        List<Pupil> FindPupil(Func<Pupil, Boolean> predicate)
        {
            return Database.Pupils.Find(predicate);
        }
        public void CreatePupil(Pupil pupil)
        {
            if (pupil == null)
            {
                throw new ValidationException("Invalid data");
            }
            pupil.loginPupil = Hash.GetHashString(pupil.loginPupil);
            pupil.passwordPupil = Hash.GetHashString(pupil.passwordPupil);

            var parents = Database.Parents.Find(p => (p.loginParent == pupil.loginPupil) ||
            (p.emailParent == pupil.emailPupil) || (p.phoneParent == pupil.phonePupil)); ;

            var pupils = FindPupil(p => (p.loginPupil == pupil.loginPupil) ||
            (p.emailPupil == pupil.loginPupil) || (p.phonePupil == pupil.phonePupil));

            var teachers = Database.Teachers.Find(t => (t.loginTeacher == pupil.loginPupil) ||
            (t.emailTeacher == pupil.emailPupil) || (t.phoneTeacher == pupil.phonePupil));

            var admins = Database.Admins.Find(a => (a.login == pupil.loginPupil));

            if ((parents.Count > 0) || (pupils.Count > 0) || (teachers.Count > 0) || (admins.Count > 0))
            {
                throw new ValidationException("This login, email or phone already exists");
            }

            Database.Pupils.Create(pupil);
        }
        public void UpdatePupil(Pupil pupil)
        {
            if (pupil == null)
            {
                throw new ValidationException("Invalid data");
            }

            var currentPupil = FindPupil(curP => curP.idPupil == pupil.idPupil);

            if (currentPupil[0].loginPupil != pupil.loginPupil)
            {
                pupil.loginPupil = Hash.GetHashString(pupil.loginPupil);
            }

            if (currentPupil[0].passwordPupil != pupil.passwordPupil)
            {
                pupil.passwordPupil = Hash.GetHashString(pupil.passwordPupil);
            }

            if (pupil.loginPupil == currentPupil[0].loginPupil &&
                pupil.passwordPupil == currentPupil[0].passwordPupil &&
                pupil.namePupil == currentPupil[0].namePupil &&
                pupil.surnamePupil == currentPupil[0].surnamePupil &&
                pupil.phonePupil == currentPupil[0].phonePupil &&
                pupil.emailPupil == currentPupil[0].emailPupil &&
                pupil.birthdayPupil == currentPupil[0].birthdayPupil &&
                pupil.idClass == currentPupil[0].idClass)
            {
                throw new ValidationException("You didn't change anything");
            }

            var classSchool = Database.ClassSchools.Get(pupil.idClass);
            if (classSchool == null)
            {
                throw new ValidationException("This class not found");
            }

            var parents = Database.Parents.Find(p => (p.loginParent == pupil.loginPupil) &&
            (p.emailParent == pupil.emailPupil) || (p.phoneParent == pupil.phonePupil));

            var pupils = FindPupil(p => (p.loginPupil == pupil.loginPupil &&
            p.idPupil != pupil.idPupil) || (p.emailPupil == pupil.emailPupil &&
            p.idPupil != pupil.idPupil) || (p.phonePupil == pupil.phonePupil &&
            p.idPupil != pupil.idPupil));

            var teachers = Database.Teachers.Find(t => (t.loginTeacher == pupil.loginPupil) &&
            (t.emailTeacher == pupil.emailPupil) || (t.phoneTeacher == pupil.phonePupil));

            var admins = Database.Admins.Find(a => (a.login == pupil.loginPupil));

            if ((parents.Count > 0) || (pupils.Count > 0) || (teachers.Count > 0) || (admins.Count > 0))
            {
                throw new ValidationException("This login, email or phone already exists");
            }

            Database.Pupils.Update(pupil);
        }
        public void DeletePupil(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var pupil = Database.Pupils.Get(id.Value);
            if (pupil == null)
                throw new ValidationException("Pupil not found");
            Database.Pupils.Delete(id.Value);
        }

        public Boolean CheckPupil(string login, string password)
        {
            if ((password == null) || (login == null))
            {
                throw new ValidationException("Invalid data");
            }
            Pupil pupil = Database.Pupils.GetByLoginPassword(login, password)[0];
            if (pupil.passwordPupil == Hash.GetHashString(password) && pupil.loginPupil == Hash.GetHashString(login))
            {
                return true;
            }
            return false;
        }
    }
}
