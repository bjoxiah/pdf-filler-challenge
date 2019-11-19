using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace DotnetCore.Controllers
{
    public class RouteController : ControllerBase
    {
        [Route("")]
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), 
                "wwwroot", "index.html"), "text/HTML");
        }
    }
}