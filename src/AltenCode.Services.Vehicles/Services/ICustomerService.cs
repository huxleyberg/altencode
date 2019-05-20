using System;
using System.Threading.Tasks;

namespace AltenCode.Services.Vehicles.Services
{
    public interface ICustomerService
    {
         Task AddAsync(Guid id, string name, string address);
    }
}