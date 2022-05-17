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
    public class AdminService
    {
        EFUnitOfWork Database = new EFUnitOfWork();
        Hash Hash = new Hash();

        public void BackUp(string downloadPath)
        {
            try
            {
                if (File.Exists(@downloadPath))
                {
                    File.Delete(@downloadPath);
                }

                FileStream fs = File.Create(downloadPath);
                fs.Close();
                string query = "BACKUP DATABASE SelfSchool TO DISK = '" + downloadPath + "';";
                Database.Admins.ContextConnection().ExecuteSqlRaw(query);
            }
            catch (Exception Ex)
            {
                throw new ValidationException(Ex.Message);
            }
        }
        public void RestoreBackUp(string downloadPath)
        {
            try
            {
                string query = "USE master";
                query += " RESTORE DATABASE SmartFood FROM DISK = '" + downloadPath + "'";
                query += " WITH REPLACE";
                Database.Admins.ContextConnection().ExecuteSqlRaw(query);
            }
            catch (Exception Ex)
            {
                throw new ValidationException(Ex.Message);
            }
        }

        public async Task<List<Admin>> GetALLAdmins()
        {
            List<Admin> admins = await Database.Admins.GetAll();
            return admins;
        }

        public Admin GetAdmin(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var admin = Database.Admins.Get(id.Value);
            if (admin == null)
                throw new ValidationException("Admin not found");
            return admin;
        }
        List<Admin> FindAdmin(Func<Admin, Boolean> predicate)
        {
            return Database.Admins.Find(predicate);
        }
        public void CreateAdmin(Admin admin)
        {
            if (admin == null)
            {
                throw new ValidationException("Invalid data");
            }

            admin.login = Hash.GetHashString(admin.login);
            admin.password = Hash.GetHashString(admin.password);

            var adm = FindAdmin(adm => adm.login == admin.login);
            
            if (adm.Count != 0) {
                throw new ValidationException("This login already exists");
            }

            Database.Admins.Create(admin);
        }
        public void UpdateAdmin(Admin admin)
        {
            if (admin == null)
            {
                throw new ValidationException("Invalid data");
            }

            var currentAdmin = FindAdmin(curAdm => curAdm.idAdmin == admin.idAdmin);

            if (currentAdmin[0].login != admin.login) {
                admin.login = Hash.GetHashString(admin.login);
            }

            admin.password = Hash.GetHashString(admin.password);

            if (admin.login == currentAdmin[0].login &&
                admin.password == currentAdmin[0].password)
            {
                throw new ValidationException("You didn't change anything");
            }

            var admins = FindAdmin(adm => (adm.login == admin.login && adm.idAdmin != admin.idAdmin));

            if (admins.Count != 0)
            {
                throw new ValidationException("This login already exists");
            }

            Database.Admins.Update(admin);
        }
        public void DeleteAdmin(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var admin = Database.Admins.Get(id.Value);
            if (admin == null)
                throw new ValidationException("Admin not found");
            Database.Admins.Delete(id.Value);
        }

        public Boolean CheckAdmin(string login, string password)
        {
            if ((password == null) || (login == null))
            {
                throw new ValidationException("Invalid data");
            }
            Admin admin = Database.Admins.GetByLoginPassword(login, password);
            if (admin.password == Hash.GetHashString(password) && admin.login == Hash.GetHashString(login))
            {
                return true;
            }
            return false;
        }
    }
}
