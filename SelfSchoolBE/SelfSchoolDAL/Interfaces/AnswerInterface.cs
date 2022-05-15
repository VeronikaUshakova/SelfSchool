using Microsoft.EntityFrameworkCore.Infrastructure;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolDAL.Interfaces
{
    public interface AnswerInterface
    {
        Task<List<Answer>> GetAll();
        Answer Get(int id);
        List<Answer> Find(Func<Answer, Boolean> predicate);
        void Create(Answer item);
        void Update(Answer item);
        void Delete(int id);
        DatabaseFacade ContextConnection();
    }
}
