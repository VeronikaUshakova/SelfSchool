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
    public class TeacherController : Controller
    {
        TeacherService teacherService = new TeacherService();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> Index()
        {
            try
            {
                return await teacherService.GetALLTeachers();
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
                var teacher = teacherService.GetTeacher(id);
                return new JsonResult(teacher);
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create(Teacher teacher)
        {
            try
            {
                teacherService.CreateTeacher(teacher);
                return new JsonResult("Teacher added successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Teacher teacher)
        {
            try
            {
                teacherService.UpdateTeacher(teacher);
                return new JsonResult("Teacher updated successfully");
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
                teacherService.DeleteTeacher(id);
                return new JsonResult("Teacher deleted successfully");
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
                return new JsonResult(teacherService.CheckTeacher(password, login));
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
