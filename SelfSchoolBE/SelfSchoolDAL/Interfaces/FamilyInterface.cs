using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Interfaces
{
    public interface FamilyInterface
    {
        Task<List<Family>> GetAll();
        Family Get(int id);
        List<Family> Find(Func<Family, Boolean> predicate);
        void Create(Family item);
        void Update(Family item);
        void Delete(int id);
        DatabaseFacade ContextConnection();
    }
}
