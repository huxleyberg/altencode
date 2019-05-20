using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AltenCode.Api.Models;


namespace AltenCode.Api.Repositories
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetAsync(Guid id);
        Task<IEnumerable<Vehicle>> GetAllAsync();

         Task<IEnumerable<Vehicle>> BrowseAsync(string customerId, string status);
        Task AddAsync(Vehicle vehicle);
    }
}