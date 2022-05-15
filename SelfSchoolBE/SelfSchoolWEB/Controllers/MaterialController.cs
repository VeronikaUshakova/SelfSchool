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
    public class MaterialController : Controller
    {
        MaterialService materialService = new MaterialService();

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Material>>> Index()
        {
            try
            {
                return await materialService.GetALLMaterials();
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
                var material = materialService.GetMaterial(id);
                return new JsonResult(material);
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create(Material material)
        {
            try
            {
                materialService.CreateMaterial(material);
                return new JsonResult("Material added successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Material material)
        {
            try
            {
                materialService.UpdateMaterial(material);
                return new JsonResult("Material updated successfully");
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
                materialService.DeleteMaterial(id);
                return new JsonResult("Material deleted successfully");
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
