using System;
using System.Threading.Tasks;
using AltenCode.Common.Events;

namespace AltenCode.Api.Handlers
{
    public class VehicleStatusUpdatedHandler : IEventHandler<VehicleStatusUpdated>
    {
        public  async Task HandleAsync(VehicleStatusUpdated @event)
        {
            await Task.CompletedTask;
            Console.WriteLine($"vechicle updated: {@event.VechicleId} and new status is {@event.Status}");
        }
    }
}