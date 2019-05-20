using System;
namespace AltenCode.Services.Vehicles.Domain.Models
{
    public class Vehicle
    {
        public Guid Id { get; protected set; }
        public string VIN { get; protected set; }  
        public string RegNo { get; protected set; }
        public string CustomerId { get; protected set; }
        public string Status { get; protected set; }

        protected Vehicle()
        {
            
        }

        public Vehicle(Guid id, string vin, string regNo, string customerId, string status)
        {
            Id = id;
            VIN = vin;
            RegNo = regNo;
            CustomerId = customerId;
            Status = status.ToLowerInvariant();
        }

        public void UpdateVehicleStatus(string status){
            Status = status.ToLowerInvariant();
        }
    }
}