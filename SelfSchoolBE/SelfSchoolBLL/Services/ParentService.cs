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
            Database.Parents.Create(parent);
        }
        public void UpdateParent(Parent parent)
        {
            if (parent == null)
            {
                throw new ValidationException("Invalid data");
            }
            parent.loginParent = Hash.GetHashString(parent.loginParent);
            parent.passwordParent = Hash.GetHashString(parent.passwordParent);
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
