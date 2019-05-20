using Microsoft.AspNetCore.Mvc;

namespace AltenCode.Api.Controllers
{
    [Route("")]
    public class HomeController : Controller
    {
        [HttpGet("")]
        public IActionResult Get() => Content("Welcome from AltenCode API!");
    }
}