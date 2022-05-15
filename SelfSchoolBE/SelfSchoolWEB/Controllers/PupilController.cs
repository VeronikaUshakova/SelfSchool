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
    public class PupilController : Controller
    {
        PupilService pupilService = new PupilService();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pupil>>> Index()
        {
            try
            {
                return await pupilService.GetALLPupils();
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
                var pupil = pupilService.GetPupil(id);
                return new JsonResult(pupil);
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create(Pupil pupil)
        {
            try
            {
                pupilService.CreatePupil(pupil);
                return new JsonResult("Pupil added successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Pupil pupil)
        {
            try
            {
                pupilService.UpdatePupil(pupil);
                return new JsonResult("Pupil updated successfully");
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
                pupilService.DeletePupil(id);
                return new JsonResult("Pupil deleted successfully");
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
                return new JsonResult(pupilService.CheckPupil(password, login));
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
