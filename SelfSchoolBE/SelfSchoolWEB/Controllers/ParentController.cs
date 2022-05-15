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
    public class ParentController : Controller
    {
        ParentService parentService = new ParentService();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Parent>>> Index()
        {
            try
            {
                return await parentService.GetALLParents();
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
                var parent = parentService.GetParent(id);
                return new JsonResult(parent);
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create(Parent parent)
        {
            try
            {
                parentService.CreateParent(parent);
                return new JsonResult("Parent added successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Parent parent)
        {
            try
            {
                parentService.UpdateParent(parent);
                return new JsonResult("Parent updated successfully");
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
                parentService.DeleteParent(id);
                return new JsonResult("Parent deleted successfully");
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
                return new JsonResult(parentService.CheckParent(password, login));
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
