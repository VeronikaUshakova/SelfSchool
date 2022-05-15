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
    public class FamilyController : Controller
    {
        FamilyService familyService = new FamilyService();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Family>>> Index()
        {
            try
            {
                return await familyService.GetALLFamilies();
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
                var family = familyService.GetFamily(id);
                return new JsonResult(family);
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create(Family family)
        {
            try
            {
                familyService.CreateFamily(family);
                return new JsonResult("Family added successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Family family)
        {
            try
            {
                familyService.UpdateFamily(family);
                return new JsonResult("Family updated successfully");
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
                familyService.DeleteFamily(id);
                return new JsonResult("Family deleted successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
