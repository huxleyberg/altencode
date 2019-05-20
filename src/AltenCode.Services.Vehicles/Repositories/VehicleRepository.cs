using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AltenCode.Services.Vehicles.Domain.Models;
using AltenCode.Services.Vehicles.Domain.Repositories;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace AltenCode.Services.Vehicles.Repositories
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

        public async Task UpdateAsync(Vehicle vehicle)
        {
            var result = await Collection.UpdateOneAsync(Builders<Vehicle>.Filter.Eq("Id", vehicle.Id),
                Builders<Vehicle>.Update.Inc(x => x.Status, vehicle.Status));

        }

        public async Task UpdateAsync(Guid id, Vehicle vehicle)
        {
            var result = await Collection.ReplaceOneAsync(x=>x.Id == id, vehicle);

        }


        public async Task<IEnumerable<Vehicle>> GetAllAsync()
            => await Collection
                .AsQueryable()
                .ToListAsync();


        private IMongoCollection<Vehicle> Collection
            => _database.GetCollection<Vehicle>("Vehicles");

    }
}