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
    public class AnswerRepository : AnswerInterface
    {
        private DatabaseContext context;
        public AnswerRepository(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task<List<Answer>> GetAll()
        {
            List<Answer> answers = new List<Answer>();
            answers = await context.Answers.ToListAsync();
            return answers;
        }
        public Answer Get(int id)
        {
            Answer answer = new Answer();
            answer = context.Answers.Find(id);
            return answer;
        }
        public List<Answer> Find(Func<Answer, Boolean> predicate)
        {
            List<Answer> answers = new List<Answer>();
            answers = context.Answers.Where(predicate).ToList();
            return answers;
        }
        public void Create(Answer answer)
        {
            context.Answers.Add(answer);
            context.SaveChanges();
        }
        public void Update(Answer answer)
        {
            var currentAnswer = context.Answers.Find(answer.idAnswer);
            context.Entry(currentAnswer).CurrentValues.SetValues(answer);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            Answer answer = context.Answers.Find(id);
            if (answer != null)
            {
                context.Answers.Remove(answer);
                context.SaveChanges();
            }
        }
        public DatabaseFacade ContextConnection()
        {
            return context.Database;
        }
    }
}
