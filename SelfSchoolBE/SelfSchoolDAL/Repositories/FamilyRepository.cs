using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.DataContext;
using SelfSchoolDAL.Entities;
using SelfSchoolDAL.Interfaces;

namespace SelfSchoolDAL.Repositories
{
    public class FamilyRepository : FamilyInterface
    {
        private DatabaseContext context;
        public FamilyRepository(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task<List<Family>> GetAll()
        {
            List<Family> families = new List<Family>();
            families = await context.Families.ToListAsync();
            return families;
        }
        public Family Get(int id)
        {
            Family family = new Family();
            family = context.Families.Find(id);
            return family;
        }
        public List<Family> Find(Func<Family, Boolean> predicate)
        {
            List<Family> families = new List<Family>();
            families = context.Families.Where(predicate).ToList();
            return families;
        }
        public void Create(Family family)
        {
            context.Families.Add(family);
            context.SaveChanges();
        }
        public void Update(Family family)
        {
            var currentFamily = context.Families.Find(family.idFamily);
            context.Entry(currentFamily).CurrentValues.SetValues(family);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            Family family = context.Families.Find(id);
            if (family != null)
            {
                context.Families.Remove(family);
                context.SaveChanges();
            }
        }
        public DatabaseFacade ContextConnection()
        {
            return context.Database;
        }
    }
}
