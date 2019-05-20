using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AltenCode.Api.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace AltenCode.Api.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
       private readonly IMongoDatabase _database;
        public CustomerRepository(IMongoDatabase database)
        {
            _database = database;
        }

        public async Task AddAsync(Customer customer)
         => await Collection.InsertOneAsync(customer);


        public async Task<IEnumerable<Customer>> GetAllAsync()
            => await Collection
                .AsQueryable()
                .ToListAsync();

        public async Task<Customer> GetAsync(Guid id)
                    => await Collection
                        .AsQueryable()
                        .FirstOrDefaultAsync(x => x.Id == id);


        private IMongoCollection<Customer> Collection
           => _database.GetCollection<Customer>("Customers");
    }
    
}