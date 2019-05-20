using System;
using System.Threading.Tasks;
using AltenCode.Services.Vehicles.Domain.Models;
using AltenCode.Services.Vehicles.Domain.Repositories;

namespace AltenCode.Services.Vehicles.Services
{
    public class CustomerService : ICustomerService
    {

        private readonly ICustomerRepository _customerRepository;
        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
        public async Task AddAsync(Guid id, string name, string address)
        {
           var customer = new Customer(id,name,address);
            await _customerRepository.AddAsync(customer);
        }
    }
}