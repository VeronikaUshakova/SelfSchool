using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SelfSchoolDAL.Interfaces;
using SelfSchoolDAL.DataContext;
using SelfSchoolDAL.Entities;
using System.Data.Common;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace SelfSchoolDAL.Repositories
{
    public class AdminRepository : AdminInterface
    {
        private DatabaseContext context;
        public AdminRepository(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task<List<Admin>> GetAll()
        {
            List<Admin> admins = new List<Admin>();
            admins = await context.Admins.ToListAsync();
            return admins;
        }
        public Admin Get(int id)
        {
            Admin admin = new Admin();
            admin = context.Admins.Find(id);
            return admin;
        }
        public List<Admin> GetByLoginPassword(string login, string password)
        {
            List<Admin> admins = Find(adm => adm.login == login && adm.password == password);
            return admins;
        }
        public List<Admin> Find(Func<Admin, Boolean> predicate)
        {
            List<Admin> admins = new List<Admin>();
            admins = context.Admins.Where(predicate).ToList();
            return admins;
        }
        public void Create(Admin admin)
        {
            context.Admins.Add(admin);
            context.SaveChanges();
        }
        public void Update(Admin admin)
        {
            var currentAdmin = context.Admins.Find(admin.idAdmin);
            context.Entry(currentAdmin).CurrentValues.SetValues(admin);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            Admin admin = context.Admins.Find(id);
            if (admin != null)
            {
                context.Admins.Remove(admin);
                context.SaveChanges();
            }
        }
        public DatabaseFacade ContextConnection()
        {
            return context.Database;
        }
    }
}
