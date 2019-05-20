using System;
using System.Threading.Tasks;
using AltenCode.Common.Commands;
using AltenCode.Common.Events;
using Microsoft.Extensions.Logging;
using RawRabbit;

namespace AltenCode.Services.Vehicles.Handlers
{
    public class UpdateVehicleStatusHandler : ICommandHandler<UpdateVehicleStatus>
    {
        private readonly ILogger _logger;
        private readonly IBusClient _busClient;
        //private readonly IActivityService _activityService;

        public UpdateVehicleStatusHandler(IBusClient busClient, ILogger<UpdateVehicleStatusHandler> logger)
        {
             _busClient = busClient;
            _logger = logger;
        }
        public async Task HandleAsync(UpdateVehicleStatus command)
        {
            _logger.LogInformation($"updating vehicle status: '{command.RegNo}' status: '{command.Status}'.");

            Console.WriteLine($"updating vehicle status: '{command.RegNo}' status: '{command.Status}'."); 

            await _busClient.PublishAsync(new VehicleStatusUpdated(command.Id,command.Status));
        }
    }
}