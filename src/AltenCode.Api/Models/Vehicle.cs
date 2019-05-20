using System;

namespace AltenCode.Api.Models
{
    public class Vehicle
    {
        public Guid Id { get; set; }
        public string VIN { get; set; }
        public string RegNo { get; set; }
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string Status { get; set; }
        public string CustomerAddress { get; set; }
    }
}