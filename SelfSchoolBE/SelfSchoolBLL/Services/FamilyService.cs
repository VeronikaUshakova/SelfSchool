using SelfSchoolBLL.Infrastructure;
using SelfSchoolDAL.Entities;
using SelfSchoolDAL.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SelfSchoolBLL.Services
{
    public class FamilyService
    {
        EFUnitOfWork Database = new EFUnitOfWork();

        public async Task<List<Family_ext>> GetALLFamilies() { 
            List<Family> families = await Database.Families.GetAll();

            List<Family_ext> families_ext = new List<Family_ext>();

            List<Pupil> pupils = await Database.Pupils.GetAll();

            for (int i = 0; i < pupils.Count; i++) 
            {
                for (int j = 0; j < families.Count; j++) 
                {
                    if (families[j].idPupil == pupils[i].idPupil)
                    {
                        if (families_ext.Count <= i)
                        {
                            Family_ext family = new Family_ext();
                            if (family.pupils == null)
                            {
                                family.pupils = new List<int>();
                            }
                            family.pupils.Add(pupils[i].idPupil);
                            if (family.parents == null)
                            {
                                family.parents = new List<int>();
                            }
                            family.parents.Add(families[j].idParent);
                            families_ext.Add(family);
                        }
                        else 
                        {
                            families_ext[i].parents.Add(families[j].idParent);
                        }
                    }
                }
            }

            for (int i = 0; i < families_ext.Count; i++) 
            {
                for (int j = i + 1; j < families_ext.Count; j++) 
                {
                    if (Enumerable.SequenceEqual(families_ext[i].parents, families_ext[j].parents))
                    {
                        families_ext[i].pupils.Add(families_ext[j].pupils[0]);
                        families_ext[j].pupils.Add(families_ext[i].pupils[0]);
                    }
                    families_ext[j].pupils.Sort();
                }
                families_ext[i].pupils.Sort();
            }


            for (int i = 0; i < families_ext.Count; i++)
            {
                for (int j = families_ext.Count - 1; j > i; j--)
                {
                    if (Enumerable.SequenceEqual(families_ext[i].parents, families_ext[j].parents))
                    {
                        families_ext.RemoveAt(j);
                    }
                }
            }

            for (int i = 0; i < families_ext.Count; i++)
            {
                families_ext[i].idFamily = i + 1;
            }

            return families_ext;
        }

        public async Task<Family_ext> GetFamily(int? id)
        {   
            if (id == null)
                throw new ValidationException("Id not found");

            List<Family_ext> families = await GetALLFamilies();
            Family_ext family = new Family_ext();

            for (int i = 0; i < families.Count; i++) 
            {
                if (families[i].idFamily == id) 
                {
                    family = families[i];
                }
            }

            if (family == null)
                throw new ValidationException("Family not found");
            return family;
        }
        public void CreateFamily(Family_ext family)
        {
            if (family == null)
            {
                throw new ValidationException("Invalid data");
            }
            for (int i = 0; i < family.parents.Count; i++) 
            {
                for (int j = 0; j < family.pupils.Count; j++) 
                {
                    Family family_new = new Family();
                    family_new.idParent = family.parents[i];
                    family_new.idPupil = family.pupils[j];

                    List<Family> families_old = Database.Families.Find(f => f.idPupil == family_new.idPupil &&
                    f.idParent == family_new.idParent);
                    if (families_old.Count > 0) 
                    {
                        throw new ValidationException("These pupils and parents have another family");
                    }

                    Database.Families.Create(family_new);
                }
            }
        }
        public async Task UpdateFamily(Family_ext family)
        {
            if (family == null)
            {
                throw new ValidationException("Invalid data");
            }

            List<Family_ext> families_ext = await GetALLFamilies();
            Family_ext family_old = new Family_ext();
            for (int i = 0; i < families_ext.Count; i++) 
            {
                if (families_ext[i].idFamily == family.idFamily) 
                {
                    family_old = families_ext[i];
                }
            }

            if(Enumerable.SequenceEqual(family_old.parents, family.parents) &&
                Enumerable.SequenceEqual(family_old.pupils, family.pupils))
            {
                throw new ValidationException("You didn't change anything");
            }

            await DeleteFamily(family.idFamily);
            CreateFamily(family);
        }
        public async Task DeleteFamily(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");

            Family_ext family = await GetFamily(id);

            if (family == null)
                throw new ValidationException("Family not found");

            List<Family> families = await Database.Families.GetAll();

            for (int i = 0; i < families.Count; i++)
            {
                for (int j = 0; j < family.parents.Count; j++)
                {
                    for (int k = 0; k < family.pupils.Count; k++)
                    {
                        if (families[i].idParent == family.parents[j] &&
                            families[i].idPupil == family.pupils[k])
                        {
                            Database.Families.Delete(families[i].idFamily);
                        }
                    }
                }
            }
        }
    }
}
