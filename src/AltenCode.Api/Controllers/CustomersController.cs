using System.Threading.Tasks;
using AltenCode.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AltenCode.Api.Controllers
{
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomersController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var customers = await  _customerRepository.GetAllAsync();
                
            return Json(customers);
        }

    }
}