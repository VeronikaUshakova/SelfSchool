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
    public class AnswerController : Controller
    {
        AnswerService answerService = new AnswerService();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Answer>>> Index()
        {
            try
            {
                return await answerService.GetALLAnswers();
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
                var answer = answerService.GetAnswer(id);
                return new JsonResult(answer);
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create(Answer answer)
        {
            try
            {
                answerService.CreateAnswer(answer);
                return new JsonResult("Answer added successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Answer answer)
        {
            try
            {
                answerService.UpdateAnswer(answer);
                return new JsonResult("Answer updated successfully");
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
                answerService.DeleteAnswer(id);
                return new JsonResult("Answer deleted successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
