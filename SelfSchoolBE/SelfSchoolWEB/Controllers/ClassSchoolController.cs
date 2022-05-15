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
    public class ClassSchoolController : Controller
    {
        ClassSchoolService classSchoolService = new ClassSchoolService();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassSchool>>> Index()
        {
            try
            {
                return await classSchoolService.GetALLClassSchool();
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
                var classSchool = classSchoolService.GetClassSchool(id);
                return new JsonResult(classSchool);
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create(ClassSchool classSchool)
        {
            try
            {
                classSchoolService.CreateClassSchool(classSchool);
                return new JsonResult("Class added successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(ClassSchool classSchool)
        {
            try
            {
                classSchoolService.UpdateClassSchool(classSchool);
                return new JsonResult("Class updated successfully");
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
                classSchoolService.DeleteClassSchool(id);
                return new JsonResult("Class deleted successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
