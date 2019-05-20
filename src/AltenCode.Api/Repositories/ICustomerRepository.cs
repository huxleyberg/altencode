using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AltenCode.Api.Models;

namespace AltenCode.Api.Repositories
{
    public interface ICustomerRepository
    {
        Task<Customer> GetAsync(Guid id);
        Task<IEnumerable<Customer>> GetAllAsync();
        Task AddAsync(Customer customer);
    }
}