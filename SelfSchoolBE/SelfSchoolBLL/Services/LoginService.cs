using SelfSchoolBLL.Infrastructure;
using SelfSchoolDAL.Entities;
using SelfSchoolDAL.Repositories;
using System.Collections.Generic;

namespace SelfSchoolBLL.Services
{
    public class LoginService
    {
        EFUnitOfWork Database = new EFUnitOfWork();
        Hash Hash = new Hash();

        public object Login(string login, string password)
        {
            if ((password == null) || (login == null))
            {
                throw new ValidationException("Invalid data");
            }

            login = Hash.GetHashString(login);
            password = Hash.GetHashString(password);

            List<Admin> admins = Database.Admins.GetByLoginPassword(login, password);
            List<Teacher> teachers = Database.Teachers.GetByLoginPassword(login, password);
            List<Pupil> pupils = Database.Pupils.GetByLoginPassword(login, password);
            List<Parent> parents = Database.Parents.GetByLoginPassword(login, password);

            if (admins.Count > 0)
            {
                return admins[0];
            }
            else if (teachers.Count > 0)
            {
                return teachers[0];
            }
            else if (pupils.Count > 0)
            {
                return pupils[0];
            }
            else if (parents.Count > 0) 
            {
                return parents[0];
            }

            return null;
        }
    }
}
