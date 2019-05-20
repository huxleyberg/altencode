using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AltenCode.Api.Models;
using AltenCode.Api.Repositories;
using AltenCode.Common.Mongo;
using MongoDB.Driver;
using System.Linq;

namespace AltenCode.Api.Services
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
                new Customer{Id = Guid.Parse("4439a9ba-8c92-487b-86da-1c25d4192bc5"), Name = "Kalles Grustransporter AB", Address = "Cementvägen 8, 111 11 Södertälje"},
                new Customer{Id=Guid.Parse("4366972a-187b-4272-8911-52c92475a8f8"),Name="Johans Bulk AB",Address="Balkvägen 12, 222 22 Stockholm"},
                new Customer{Id=Guid.Parse("972a44a4-3622-4b34-b1e2-812b293028f5"),Name="Haralds Värdetransporter AB",Address="Budgetvägen 1, 333 33 Uppsala"}
            };

            var vehicles = new List<Vehicle>
            {
                new Vehicle{
                    Id=Guid.Parse("ac9fc4ce-bb13-4062-8e5d-8e1e52b2b94e"),
                    VIN= "YS2R4X20005399401",
                    RegNo = "ABC123",
                    CustomerId = Guid.Parse("4439a9ba-8c92-487b-86da-1c25d4192bc5"),
                    CustomerAddress = "Cementvägen 8, 111 11 Södertälje",
                    CustomerName = "Kalles Grustransporter AB",
                    Status = "connected"}
                    ,
                new Vehicle{Id=Guid.Parse("10d32b8f-8d1c-4b8b-9ee0-6742f810098d"),
                VIN="VLUR4X20009093588",
                RegNo="DEF456",
                CustomerId = Guid.Parse("4439a9ba-8c92-487b-86da-1c25d4192bc5"),
                CustomerAddress = "Cementvägen 8, 111 11 Södertälje",
                    CustomerName = "Kalles Grustransporter AB",
                    Status="disconnected"},

                new Vehicle{Id=Guid.Parse("2d515d43-a06b-4563-904f-41a1ff95e30a"),
                VIN="VLUR4X20009048066",
                RegNo="GHI789",
                CustomerId=Guid.Parse("4439a9ba-8c92-487b-86da-1c25d4192bc5"),
                CustomerAddress = "Cementvägen 8, 111 11 Södertälje",
                    CustomerName = "Kalles Grustransporter AB",Status="connected"},


                new Vehicle{Id=Guid.Parse("1b3e578d-5337-4574-b9c5-50506b6f7838"),
                VIN="YS2R4X20005388011",
                RegNo="JKL012",
                CustomerId = Guid.Parse("4366972a-187b-4272-8911-52c92475a8f8"),CustomerName="Johans Bulk AB",CustomerAddress="Balkvägen 12, 222 22 Stockholm",Status ="disconnected"},
                new Vehicle{Id=Guid.Parse("03847a16-7b60-412e-be06-47a2ab7ac1b8"),
                VIN="YS2R4X20005387949",
                RegNo = "MNO345",
                CustomerId=Guid.Parse("4366972a-187b-4272-8911-52c92475a8f8"),CustomerName="Johans Bulk AB",CustomerAddress="Balkvägen 12, 222 22 Stockholm",
                Status="connected"},


                new Vehicle{Id=Guid.Parse("4d1dd5ec-632b-4ffe-a84c-3dcc6ca3e15b"),CustomerName="Haralds Värdetransporter AB",CustomerAddress="Budgetvägen 1, 333 33 Uppsala",
                VIN="VLUR4X20009048066",
                RegNo="PQR678",
                CustomerId=Guid.Parse("972a44a4-3622-4b34-b1e2-812b293028f5"),Status="disconnected"},
                new Vehicle
                {
                    Id = Guid.Parse("3cca0e60-8015-449e-9793-71ee33495578"),
                    CustomerName = "Haralds Värdetransporter AB",
                    CustomerAddress = "Budgetvägen 1, 333 33 Uppsala"
                ,
                    VIN = "YS2R4X20005387055",
                    RegNo = "STU901",
                    CustomerId = Guid.Parse("972a44a4-3622-4b34-b1e2-812b293028f5"),
                    Status = "connected"},

                };

            await Task.WhenAll(vehicles.Select(x => _vehicleRepository
                        .AddAsync(x)));

            await Task.WhenAll(customers.Select(x => _customerRepository
            .AddAsync(x)));
        }
    }
}