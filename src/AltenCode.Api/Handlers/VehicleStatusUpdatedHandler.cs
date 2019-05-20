using System;
using System.Threading.Tasks;
using AltenCode.Api.Repositories;
using AltenCode.Common.Events;

namespace AltenCode.Api.Handlers
{
    public class VehicleStatusUpdatedHandler : IEventHandler<VehicleStatusUpdated>
    {
        private readonly IVehicleRepository _vehicleRepository;
        public VehicleStatusUpdatedHandler(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }
        public  async Task HandleAsync(VehicleStatusUpdated @event)
        {
            var vehicle = await _vehicleRepository.GetAsync(@event.VechicleId);
            
            vehicle.Status = @event.Status;

            await _vehicleRepository.UpdateAsync(@event.VechicleId, vehicle);

            Console.WriteLine($"vechicle updated: {@event.VechicleId} and new status is {@event.Status}");
        }
    }
}