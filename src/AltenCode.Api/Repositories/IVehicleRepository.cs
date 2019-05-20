using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AltenCode.Api.Models;


namespace AltenCode.Api.Repositories
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetAsync(Guid id);
        Task<IList<Vehicle>> GetAllAsync();
        Task<int> CountAsync();
         Task<IEnumerable<Vehicle>> BrowseAsync(string customerId, string status);
        Task AddAsync(Vehicle vehicle);
        Task UpdateAsync(Guid id, Vehicle vehicle);
    }
}