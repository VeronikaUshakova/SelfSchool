using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.DataContext;
using SelfSchoolDAL.Entities;
using SelfSchoolDAL.Interfaces;

namespace SelfSchoolDAL.Repositories
{
    public class ParentRepository : ParentInterface
    {
        private DatabaseContext context;
        public ParentRepository(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task<List<Parent>> GetAll()
        {
            List<Parent> parents = new List<Parent>();
            parents = await context.Parents.ToListAsync();
            return parents;
        }
        public Parent Get(int id)
        {
            Parent parent = new Parent();
            parent = context.Parents.Find(id);
            return parent;
        }
        public List<Parent> GetByLoginPassword(string login, string password)
        {
            List <Parent> parents = Find(parent => parent.loginParent == login &&
                parent.passwordParent == password);
            return parents;
        }
        public List<Parent> Find(Func<Parent, Boolean> predicate)
        {
            List<Parent> parents = new List<Parent>();
            parents = context.Parents.Where(predicate).ToList();
            return parents;
        }
        public void Create(Parent parent)
        {
            context.Parents.Add(parent);
            context.SaveChanges();
        }
        public void Update(Parent parent)
        {
            var currentParent = context.Parents.Find(parent.idParent);
            context.Entry(currentParent).CurrentValues.SetValues(parent);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            Parent parent = context.Parents.Find(id);
            if (parent != null)
            {
                context.Parents.Remove(parent);
                context.SaveChanges();
            }
        }

        public DatabaseFacade ContextConnection()
        {
            return context.Database;
        }
    }
}
