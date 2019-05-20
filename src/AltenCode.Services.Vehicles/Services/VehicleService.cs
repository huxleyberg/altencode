using System;
using System.Threading.Tasks;
using AltenCode.Services.Vehicles.Domain.Models;
using AltenCode.Services.Vehicles.Domain.Repositories;

namespace AltenCode.Services.Vehicles.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;

        public VehicleService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task AddAsync(Guid id, string vin, string regNo, string customerId, string status)
        {
            var vehicle = new Vehicle(id,vin,regNo,customerId,status);
            await _vehicleRepository.AddAsync(vehicle);
        }
    }
}