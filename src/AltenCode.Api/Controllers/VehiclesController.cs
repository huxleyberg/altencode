using System;
using System.Threading.Tasks;
using AltenCode.Api.Repositories;
using AltenCode.Common.Commands;
using Microsoft.AspNetCore.Mvc;
using RawRabbit;

namespace AltenCode.Api.Controllers
{
    [Route("api/[controller]")]
    public class VehiclesController : Controller
    {
        private readonly IBusClient _busClient;
        private readonly IVehicleRepository _vehicleRepository;

        public VehiclesController(IBusClient busClient, IVehicleRepository vehicleRepository)
        {
            _busClient = busClient;
            _vehicleRepository = vehicleRepository;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var vehicle = await _vehicleRepository.GetAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Json(vehicle);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var vechicles = await _vehicleRepository.GetAllAsync();

            return Json(vechicles);
        }

        [HttpGet]
        [Route("Search/customer/{customerId}/status/{status}")]
        public async Task<IActionResult> Search(string customerId, string status)
        {
            var vechicles = await _vehicleRepository.BrowseAsync(customerId, status);

            return Json(vechicles);
        }

        [HttpPost("UpdateVechicleStatus")]
        public async Task<IActionResult> UpdateVechicleStatus([FromBody]UpdateVehicleStatus command)
        {
            // var vehicle = await _vehicleRepository.GetAsync(command.Id);
            // if (vehicle == null)
            // {
            //     return NotFound();
            // }
            // command.Id = Guid.NewGuid();
            // command.UserId = Guid.Parse(User.Identity.Name);
            // command.CreatedAt = DateTime.UtcNow;
            // await _busClient.PublishAsync(command);
            //vehicle.Status = command.Status;
            await _busClient.PublishAsync(command);

            return Accepted($"vehicles/{command.Id}");
        }
    }


}