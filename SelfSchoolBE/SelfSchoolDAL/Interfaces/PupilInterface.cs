using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Interfaces
{
    public interface PupilInterface
    {
        Task<List<Pupil>> GetAll();
        Pupil Get(int id);
        Pupil GetByLoginPassword(string logon, string password);
        List<Pupil> Find(Func<Pupil, Boolean> predicate);
        void Create(Pupil item);
        void Update(Pupil item);
        void Delete(int id);
        DatabaseFacade ContextConnection();
    }
}
