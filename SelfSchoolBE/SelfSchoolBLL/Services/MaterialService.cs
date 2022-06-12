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

            for (int i = materials.Count - 1; i >= 0; i--)
            {
                if (materials[i].fileMaterial.Length > 0)
                {
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), materials[i].fileMaterial);
                    if (!System.IO.File.Exists(pathToSave))
                    {
                        DeleteMaterial(materials[i].idMaterial);
                    }
                }
            }

            materials = await Database.Materials.GetAll();
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

            var materials = FindMaterial(m => material.fileMaterial == m.fileMaterial ||
            material.urlMaterial == m.fileMaterial);

            if (materials.Count > 0) 
            {
                throw new ValidationException("This material already exists");
            }

            Database.Materials.Create(material);
        }
        public void UpdateMaterial(Material material)
        {
            if (material == null)
            {
                throw new ValidationException("Invalid data");
            }

            var currentMaterial = FindMaterial(curM => curM.idMaterial == material.idMaterial);


            if (material.urlMaterial == currentMaterial[0].urlMaterial &&
                material.fileMaterial == currentMaterial[0].fileMaterial)
            {
                throw new ValidationException("You didn't change anything");
            }

            var materials = FindMaterial(m => (material.fileMaterial == m.fileMaterial &&
            material.idMaterial != m.idMaterial) || (material.urlMaterial == m.fileMaterial &&
            material.idMaterial != m.idMaterial));

            if (materials.Count > 0)
            {
                throw new ValidationException("This material already exists");
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
