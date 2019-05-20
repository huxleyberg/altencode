using System;

namespace AltenCode.Services.Vehicles.Domain.Models
{
    public class Customer
    {
        public Guid Id { get; protected set; }
        public string Name { get; protected set; }  
        public string Address { get; protected set; }

        public Customer(Guid id, string name, string address)
        {
            Id = id;
            Name = name;
            Address = address;
        }

        protected Customer()
        {
            
        }
    }
}