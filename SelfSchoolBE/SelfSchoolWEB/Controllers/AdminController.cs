using Microsoft.AspNetCore.Mvc;
using SelfSchoolBLL.Infrastructure;
using SelfSchoolBLL.Services;
using SelfSchoolDAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SelfSchoolWEB.Controllers
{
    [ApiController]
    [Route("[controller]/[action]/{id?}")]
    public class AdminController : Controller
    {
        AdminService adminService = new AdminService();

        [HttpGet]
        public IActionResult BackUp(string str)
        {
            if (str != null)
            {
                try
                {
                    adminService.BackUp(@"C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\Backup\" + str+".bak");
                    return new JsonResult("Backup created");
                }
                catch (ValidationException ex)
                {
                    return Content(ex.Message);
                }
            }
            else 
            {
                return new JsonResult("Enter the path to save the backup");
            }
        }
        [HttpGet]
        public IActionResult RestoreBackUp(string str)
        {
            if (str != null)
            {
                try
                {
                    adminService.RestoreBackUp(str);
                    return new JsonResult("Backup applied");
                }
                catch (ValidationException ex)
                {
                    return Content(ex.Message);
                }
            }
            else
            {
                return new JsonResult("Enter the path to apply the backup");
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> Index()
        {
            try
            {
                return await adminService.GetALLAdmins();
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        public ActionResult Details(int id)
        {
            try
            {
                var admin = adminService.GetAdmin(id);
                return new JsonResult(admin);
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create(Admin admin)
        {
            try
            {
                adminService.CreateAdmin(admin);
                return new JsonResult("Admin added successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Admin admin)
        {
            try
            {
                adminService.UpdateAdmin(admin);
                return new JsonResult("Admin updated successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            try
            {
                adminService.DeleteAdmin(id);
                return new JsonResult("Admin deleted successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet]
        public ActionResult Check([FromHeader]string password,[FromHeader] string login)
        {
            try
            {
                return new JsonResult(adminService.CheckAdmin(password, login));
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
