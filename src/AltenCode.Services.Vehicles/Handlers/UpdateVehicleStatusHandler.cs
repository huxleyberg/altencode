using System;
using System.Threading.Tasks;
using AltenCode.Common.Commands;
using AltenCode.Common.Events;
using AltenCode.Services.Vehicles.Domain.Repositories;
using AltenCode.Services.Vehicles.Services;
using Microsoft.Extensions.Logging;
using RawRabbit;

namespace AltenCode.Services.Vehicles.Handlers
{
    public class UpdateVehicleStatusHandler : ICommandHandler<UpdateVehicleStatus>
    {
        private readonly ILogger _logger;
        private readonly IBusClient _busClient;
        private readonly IVehicleRepository _vehicleRepository;

        public UpdateVehicleStatusHandler(IBusClient busClient, ILogger<UpdateVehicleStatusHandler> logger, IVehicleRepository vehicleRepository)
        {
             _busClient = busClient;
            _logger = logger;
            _vehicleRepository = vehicleRepository;
        }
        public async Task HandleAsync(UpdateVehicleStatus command)
        {
            _logger.LogInformation($"updating vehicle status: '{command.VehicleId}' status: '{command.Status}'.");
            
            Console.WriteLine($"updating vehicle status: '{command.VehicleId}' status: '{command.Status}'."); 

            var vehicle = await _vehicleRepository.GetAsync(command.VehicleId);

            await _vehicleRepository.UpdateAsync(command.VehicleId, vehicle);

            await _busClient.PublishAsync(new VehicleStatusUpdated(command.VehicleId,command.Status));
        }
    }
}