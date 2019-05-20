using System;

namespace AltenCode.Common.Events
{
    public class VehicleStatusUpdated : IEvent
    {
        public Guid VechicleId { get; }
        public string Status { get;}

        protected VehicleStatusUpdated()
        {
            
        }

        public VehicleStatusUpdated(Guid vechicleId, string status)
        {
            VechicleId = vechicleId;
            Status = status;

        }
    }
}