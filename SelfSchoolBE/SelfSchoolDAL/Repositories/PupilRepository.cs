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
    public class PupilRepository : PupilInterface
    {
        private DatabaseContext context;
        public PupilRepository(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task<List<Pupil>> GetAll()
        {
            List<Pupil> pupils = new List<Pupil>();
            pupils = await context.Pupils.ToListAsync();
            return pupils;
        }
        public Pupil Get(int id)
        {
            Pupil pupil = new Pupil();
            pupil = context.Pupils.Find(id);
            return pupil;
        }
        public Pupil GetByLoginPassword(string login, string password)
        {
            Pupil pupil = new Pupil();
            pupil = context.Pupils.Find(login, password);
            return pupil;
        }
        public List<Pupil> Find(Func<Pupil, Boolean> predicate)
        {
            List<Pupil> pupils = new List<Pupil>();
            pupils = context.Pupils.Where(predicate).ToList();
            return pupils;
        }
        public void Create(Pupil pupil)
        {
            context.Pupils.Add(pupil);
            context.SaveChanges();
        }
        public void Update(Pupil pupil)
        {
            var currentPupil = context.Pupils.Find(pupil.idPupil);
            context.Entry(currentPupil).CurrentValues.SetValues(pupil);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            Pupil pupil = context.Pupils.Find(id);
            if (pupil != null)
            {
                context.Pupils.Remove(pupil);
                context.SaveChanges();
            }
        }
        public DatabaseFacade ContextConnection()
        {
            return context.Database;
        }
    }
}
