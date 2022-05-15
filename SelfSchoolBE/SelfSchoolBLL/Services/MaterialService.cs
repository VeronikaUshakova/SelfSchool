using Microsoft.EntityFrameworkCore;
using SelfSchoolBLL.Infrastructure;
using SelfSchoolDAL.Entities;
using SelfSchoolDAL.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolBLL.Services
{
    public class MaterialService
    {
        EFUnitOfWork Database = new EFUnitOfWork();

        public async Task<List<Material>> GetALLMaterials() { 
            List<Material> materials = await Database.Materials.GetAll();
            return materials;
        }

        public Material GetMaterial(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var material = Database.Materials.Get(id.Value);
            if (material == null)
                throw new ValidationException("Material not found");
            return material;
        }
        List<Material> FindMaterial(Func<Material, Boolean> predicate)
        {
            return Database.Materials.Find(predicate);
        }
        public void CreateMaterial(Material material)
        {
            if (material == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.Materials.Create(material);
        }
        public void UpdateMaterial(Material material)
        {
            if (material == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.Materials.Update(material);
        }
        public void DeleteMaterial(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var material = Database.Materials.Get(id.Value);
            if (material == null)
                throw new ValidationException("Material not found");
            Database.Materials.Delete(id.Value);
        }
    }
}
