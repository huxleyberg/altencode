using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AltenCode.Api.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System.Linq;

namespace AltenCode.Api.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly IMongoDatabase _database;
        public VehicleRepository(IMongoDatabase database)
        {
            _database = database;
        }

        public async Task<Vehicle> GetAsync(Guid id)
                    => await Collection
                        .AsQueryable()
                        .FirstOrDefaultAsync(x => x.Id == id);

        public async Task AddAsync(Vehicle vehicle)
            => await Collection.InsertOneAsync(vehicle);


        public async Task<IEnumerable<Vehicle>> GetAllAsync()
            => await Collection
                .AsQueryable()
                .ToListAsync();

        public async Task<IEnumerable<Vehicle>> BrowseAsync(string customerId, string status)
        {
            var vehicles = await GetAllAsync();

            if(customerId != "All"){
                vehicles = vehicles.Where(x=>x.CustomerId.ToString() == customerId).ToList();
            }

            if(status != "All"){
                vehicles = vehicles.Where(x=>x.Status == status).ToList();
            }

            return vehicles;
        }

        private IMongoCollection<Vehicle> Collection
            => _database.GetCollection<Vehicle>("Vehicles");

    }
}