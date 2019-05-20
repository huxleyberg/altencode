using System;
using System.Threading.Tasks;

namespace AltenCode.Services.Vehicles.Services
{
    public interface IVehicleService
    {
         Task AddAsync(Guid id, string vin, string regNo, string customerId, string status);
        
    }
}