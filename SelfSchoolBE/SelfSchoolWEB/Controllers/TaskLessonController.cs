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
    public class TaskLessonController : Controller
    {
        TaskLessonService taskLessonService = new TaskLessonService();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskLesson>>> Index()
        {
            try
            {
                return await taskLessonService.GetALLTaskLessons();
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
                var taskLesson = taskLessonService.GetTaskLesson(id);
                return new JsonResult(taskLesson);
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create(TaskLesson taskLesson)
        {
            try
            {
                taskLessonService.CreateTaskLesson(taskLesson);
                return new JsonResult("Task added successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(TaskLesson taskLesson)
        {
            try
            {
                taskLessonService.UpdateTaskLesson(taskLesson);
                return new JsonResult("Task updated successfully");
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
                taskLessonService.DeleteTaskLesson(id);
                return new JsonResult("Task deleted successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
