using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AltenCode.Services.Vehicles.Domain.Models;

namespace AltenCode.Services.Vehicles.Domain.Repositories
{
    public interface ICustomerRepository
    {
        Task<Customer> GetAsync(Guid id);
        Task<IEnumerable<Customer>> GetAllAsync();
        Task AddAsync(Customer customer);
    }
}