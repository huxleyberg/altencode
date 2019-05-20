using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AltenCode.Services.Vehicles.Domain.Models;

namespace AltenCode.Services.Vehicles.Domain.Repositories
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetAsync(Guid id);
        Task<IEnumerable<Vehicle>> GetAllAsync();
        Task AddAsync(Vehicle vehicle);
        Task UpdateAsync(Guid id, Vehicle vehicle);
        Task UpdateAsync(Vehicle vehicle);
    }
}