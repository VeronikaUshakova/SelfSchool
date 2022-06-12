using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Interfaces
{
    public interface ParentInterface
    {
        Task<List<Parent>> GetAll();
        Parent Get(int id);
       List<Parent> GetByLoginPassword(string logon, string password);

        List<Parent> Find(Func<Parent, Boolean> predicate);
        void Create(Parent item);
        void Update(Parent item);
        void Delete(int id);
        DatabaseFacade ContextConnection();
    }
}
