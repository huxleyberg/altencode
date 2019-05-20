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

        [HttpPost("ChangeVehicleStatus")]
        public async Task<IActionResult> ChangeVehicleStatus()
        {
            //get all the vehicles, select one
            var vechicles = await _vehicleRepository.GetAllAsync();
            var count = await _vehicleRepository.CountAsync();
            var random = new Random();
            int index = random.Next(count);

            var vehicle = vechicles[index];
            UpdateVehicleStatus command = new UpdateVehicleStatus();
            command.VehicleId = Guid.Parse(vehicle?.Id.ToString());

            if(vehicle.Status == "connected"){
                command.Status = "disconnected";
            }
            else{
                command.Status = "connected";
            }


            await _busClient.PublishAsync(command);

            return Accepted($"vehicles/{command.VehicleId}");
        }
    }


}