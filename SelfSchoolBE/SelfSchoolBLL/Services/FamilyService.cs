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
    public class FamilyService
    {
        EFUnitOfWork Database = new EFUnitOfWork();

        public async Task<List<Family>> GetALLFamilies() { 
            List<Family> families = await Database.Families.GetAll();
            return families;
        }

        public Family GetFamily(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var family = Database.Families.Get(id.Value);
            if (family == null)
                throw new ValidationException("Family not found");
            return family;
        }
        List<Family> FindFamily(Func<Family, Boolean> predicate)
        {
            return Database.Families.Find(predicate);
        }
        public void CreateFamily(Family family)
        {
            if (family == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.Families.Create(family);
        }
        public void UpdateFamily(Family family)
        {
            if (family == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.Families.Update(family);
        }
        public void DeleteFamily(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var family = Database.Families.Get(id.Value);
            if (family == null)
                throw new ValidationException("Family not found");
            Database.Families.Delete(id.Value);
        }
    }
}
