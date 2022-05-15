using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Interfaces
{
    public interface AdminInterface
    {
        Task<List<Admin>> GetAll();
        Admin Get(int id);
        Admin GetByLoginPassword(string logon, string password);
        List<Admin> Find(Func<Admin, Boolean> predicate);
        void Create(Admin item);
        void Update(Admin item);
        void Delete(int id);
        DatabaseFacade ContextConnection();
    }
}
