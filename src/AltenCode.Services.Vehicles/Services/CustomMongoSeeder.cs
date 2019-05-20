using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AltenCode.Common.Mongo;
using AltenCode.Services.Vehicles.Domain.Models;
using AltenCode.Services.Vehicles.Domain.Repositories;
using MongoDB.Driver;
using System.Linq;

namespace AltenCode.Services.Vehicles.Services
{
    public class CustomMongoSeeder : MongoSeeder
    {
        private readonly IVehicleRepository _vehicleRepository;

        private readonly ICustomerRepository _customerRepository;

        public CustomMongoSeeder(IMongoDatabase database,
            IVehicleRepository vehicleRepository, ICustomerRepository customerRepository)
            : base(database)
        {
            _vehicleRepository = vehicleRepository;
            _customerRepository = customerRepository;
        }

        protected override async Task CustomSeedAsync()
        {
            var customers = new List<Customer>
            {
                new Customer(Guid.Parse("4439a9ba-8c92-487b-86da-1c25d4192bc5"),"Kalles Grustransporter AB","Cementvägen 8, 111 11 Södertälje"),
                new Customer(Guid.Parse("4366972a-187b-4272-8911-52c92475a8f8"),"Johans Bulk AB","Balkvägen 12, 222 22 Stockholm"),
                new Customer(Guid.Parse("972a44a4-3622-4b34-b1e2-812b293028f5"),"Haralds Värdetransporter AB","Budgetvägen 1, 333 33 Uppsala")
            };

            var vehicles = new List<Vehicle>
            {
                new Vehicle(Guid.Parse("ac9fc4ce-bb13-4062-8e5d-8e1e52b2b94e"),"YS2R4X20005399401","ABC123","4439a9ba-8c92-487b-86da-1c25d4192bc5","connected"),
                new Vehicle(Guid.Parse("10d32b8f-8d1c-4b8b-9ee0-6742f810098d"),"VLUR4X20009093588","DEF456","4439a9ba-8c92-487b-86da-1c25d4192bc5","disconnected"),
                new Vehicle(Guid.Parse("2d515d43-a06b-4563-904f-41a1ff95e30a"),"VLUR4X20009048066","GHI789","4439a9ba-8c92-487b-86da-1c25d4192bc5","connected"),
                new Vehicle(Guid.Parse("1b3e578d-5337-4574-b9c5-50506b6f7838"),"YS2R4X20005388011","JKL012","4366972a-187b-4272-8911-52c92475a8f8","disconnected"),
                new Vehicle(Guid.Parse("03847a16-7b60-412e-be06-47a2ab7ac1b8"),"YS2R4X20005387949","MNO345","4366972a-187b-4272-8911-52c92475a8f8","connected"),
                new Vehicle(Guid.Parse("4d1dd5ec-632b-4ffe-a84c-3dcc6ca3e15b"),"VLUR4X20009048066","PQR678","972a44a4-3622-4b34-b1e2-812b293028f5","disconnected"),
                new Vehicle(Guid.Parse("3cca0e60-8015-449e-9793-71ee33495578"),"YS2R4X20005387055","STU901","972a44a4-3622-4b34-b1e2-812b293028f5","connected"),

            };

            await Task.WhenAll(vehicles.Select(x => _vehicleRepository
                        .AddAsync(x)));

            await Task.WhenAll(customers.Select(x => _customerRepository
            .AddAsync(x)));
        }
    }
}