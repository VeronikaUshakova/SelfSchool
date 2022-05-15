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
    public class LessonController : Controller
    {
        LessonService lessonService = new LessonService();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lesson>>> Index()
        {
            try
            {
                return await lessonService.GetALLLessons();
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
                var lesson = lessonService.GetLesson(id);
                return new JsonResult(lesson);
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create(Lesson lesson)
        {
            try
            {
                lessonService.CreateLesson(lesson);
                return new JsonResult("Lesson added successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Lesson lesson)
        {
            try
            {
                lessonService.UpdateLesson(lesson);
                return new JsonResult("Lesson updated successfully");
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
                lessonService.DeleteLesson(id);
                return new JsonResult("Lesson deleted successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
