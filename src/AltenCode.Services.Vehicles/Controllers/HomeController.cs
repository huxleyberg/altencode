using Microsoft.AspNetCore.Mvc;

namespace AltenCode.Services.Vehicles.Controllers
{
    [Route("")]
    public class HomeController : Controller
    {
        [HttpGet("")]
        public IActionResult Get() => Content("Welcome to AltenCode.Services.Activities API!");
    }
}