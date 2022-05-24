using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using SelfSchoolBLL.Infrastructure;
using SelfSchoolBLL.Services;
using SelfSchoolDAL.Entities;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
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

        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult> Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (!Directory.Exists(pathToSave)) 
                {
                    Directory.CreateDirectory(pathToSave);
                }

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return new JsonResult(dbPath);
                }
                else
                {
                    return new JsonResult("You need to choose the file");
                }
            }
            catch (ValidationException ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet, DisableRequestSizeLimit]
        public async Task<IActionResult> Download([FromQuery] string fileUrl)
        {
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), fileUrl);
            if (!System.IO.File.Exists(pathToSave))
                return NotFound();
            var memory = new MemoryStream();
            await using (var stream = new FileStream(pathToSave, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(pathToSave), pathToSave);
        }

        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;

            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }

            return contentType;
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
