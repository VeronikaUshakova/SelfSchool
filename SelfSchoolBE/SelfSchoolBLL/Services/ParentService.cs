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
    public class ParentService
    {
        EFUnitOfWork Database = new EFUnitOfWork();
        Hash Hash = new Hash();

        public async Task<List<Parent>> GetALLParents()
        {
            List<Parent> parents = await Database.Parents.GetAll();
            return parents;
        }

        public Parent GetParent(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var parent = Database.Parents.Get(id.Value);
            if (parent == null)
                throw new ValidationException("Parent not found");
            return parent;
        }
        List<Parent> FindParent(Func<Parent, Boolean> predicate)
        {
            return Database.Parents.Find(predicate);
        }
        public void CreateParent(Parent parent)
        {
            if (parent == null)
            {
                throw new ValidationException("Invalid data");
            }

            parent.loginParent = Hash.GetHashString(parent.loginParent);
            parent.passwordParent = Hash.GetHashString(parent.passwordParent);

            var parents = FindParent(p => (p.loginParent == parent.loginParent) ||
            (p.emailParent == parent.emailParent) || (p.phoneParent == parent.phoneParent));

            var pupils = Database.Pupils.Find(p => (p.loginPupil == parent.loginParent) ||
            (p.emailPupil == parent.emailParent) || (p.phonePupil == parent.phoneParent));

            var teachers = Database.Teachers.Find(t => (t.loginTeacher == parent.loginParent) ||
            (t.emailTeacher == parent.emailParent) || (t.phoneTeacher == parent.phoneParent));

            if ((parents.Count > 0) || (pupils.Count > 0) || (teachers.Count > 0)) {
                throw new ValidationException("This login, email or phone already exists");
            }

            Database.Parents.Create(parent);
        }
        public void UpdateParent(Parent parent)
        {
            if (parent == null)
            {
                throw new ValidationException("Invalid data");
            }

            var currentParent = FindParent(curP => curP.idParent == parent.idParent);

            if (currentParent[0].loginParent != parent.loginParent)
            {
                parent.loginParent = Hash.GetHashString(parent.loginParent);
            }

            if (currentParent[0].passwordParent != parent.passwordParent)
            {
                parent.passwordParent = Hash.GetHashString(parent.passwordParent);
            }

            if (parent.loginParent == currentParent[0].loginParent &&
                parent.passwordParent == currentParent[0].passwordParent &&
                parent.nameParent == currentParent[0].nameParent &&
                parent.surnameParent == currentParent[0].surnameParent &&
                parent.phoneParent == currentParent[0].phoneParent &&
                parent.emailParent == currentParent[0].emailParent &&
                parent.birthdayParent == currentParent[0].birthdayParent)
            {
                throw new ValidationException("You didn't change anything");
            }

            var parents = FindParent(p => (p.loginParent == parent.loginParent && 
            p.idParent != parent.idParent) || (p.emailParent == parent.emailParent &&
            p.idParent != parent.idParent) || (p.phoneParent == parent.phoneParent &&
            p.idParent != parent.idParent));

            var pupils = Database.Pupils.Find(p => (p.loginPupil == parent.loginParent) ||
            (p.emailPupil == parent.emailParent) || (p.phonePupil == parent.phoneParent));

            var teachers = Database.Teachers.Find(t => (t.loginTeacher == parent.loginParent) ||
            (t.emailTeacher == parent.emailParent) || (t.phoneTeacher == parent.phoneParent));

            if ((parents.Count > 0) || (pupils.Count > 0) || (teachers.Count > 0))
            {
                throw new ValidationException("This login, email or phone already exists");
            }

            Database.Parents.Update(parent);
        }
        public void DeleteParent(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var parent = Database.Parents.Get(id.Value);
            if (parent == null)
                throw new ValidationException("Parent not found");
            Database.Parents.Delete(id.Value);
        }

        public Boolean CheckParent(string login, string password)
        {
            if ((password == null) || (login == null))
            {
                throw new ValidationException("Invalid data");
            }
            Parent parent = Database.Parents.GetByLoginPassword(login, password);
            if (parent.passwordParent == Hash.GetHashString(password) && parent.loginParent == Hash.GetHashString(login))
            {
                return true;
            }
            return false;
        }
    }
}
