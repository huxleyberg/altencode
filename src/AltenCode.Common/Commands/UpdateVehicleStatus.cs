using System;

namespace AltenCode.Common.Commands
{
    public class UpdateVehicleStatus : ICommand
    {
        public Guid Id { get; protected set; }
        public string VIN { get; protected set; }  
        public string RegNo { get; protected set; }
        public Guid CustomerId { get; protected set; }
        public string CustomerName { get; protected set; }
        public string Status { get; protected set; }
    }
}