using System;
using System.Collections.Generic;
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
    public class MaterialRepository : MaterialInterface
    {
        private DatabaseContext context;
        public MaterialRepository(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task<List<Material>> GetAll()
        {
            List<Material> materials = new List<Material>();
            materials = await context.Materials.ToListAsync();
            return materials;
        }
        public Material Get(int id)
        {
            Material material = new Material();
            material = context.Materials.Find(id);
            return material;
        }
        public List<Material> Find(Func<Material, Boolean> predicate)
        {
            List<Material> materials = new List<Material>();
            materials = context.Materials.Where(predicate).ToList();
            return materials;
        }
        public void Create(Material material)
        {
            context.Materials.Add(material);
            context.SaveChanges();
        }
        public void Update(Material material)
        {
            var currentMaterial = context.Materials.Find(material.idMaterial);
            context.Entry(currentMaterial).CurrentValues.SetValues(material);
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            Material material = context.Materials.Find(id);
            if (material != null)
            {
                context.Materials.Remove(material);
                context.SaveChanges();
            }
        }
        public DatabaseFacade ContextConnection()
        {
            return context.Database;
        }
    }
}
