using System;

namespace AltenCode.Common.Commands
{
    public class UpdateVehicleStatus : ICommand
    {
        public Guid VehicleId { get;  set; }
        public string Status { get;  set; }
    }
}