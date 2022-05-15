using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Interfaces
{
    public interface MaterialInterface
    {
        Task<List<Material>> GetAll();
        Material Get(int id);
        List<Material> Find(Func<Material, Boolean> predicate);
        void Create(Material item);
        void Update(Material item);
        void Delete(int id);
        DatabaseFacade ContextConnection();
    }
}
