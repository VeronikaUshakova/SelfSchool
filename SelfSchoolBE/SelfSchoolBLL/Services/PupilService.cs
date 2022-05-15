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
            Database.Pupils.Create(pupil);
        }
        public void UpdatePupil(Pupil pupil)
        {
            if (pupil == null)
            {
                throw new ValidationException("Invalid data");
            }
            pupil.loginPupil = Hash.GetHashString(pupil.loginPupil);
            pupil.passwordPupil = Hash.GetHashString(pupil.passwordPupil);
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
            Pupil pupil = Database.Pupils.GetByLoginPassword(login, password);
            if (pupil.passwordPupil == Hash.GetHashString(password) && pupil.loginPupil == Hash.GetHashString(login))
            {
                return true;
            }
            return false;
        }
    }
}
