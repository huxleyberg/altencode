using System.Threading.Tasks;

namespace AltenCode.Common.Mongo
{
    public interface IDatabaseSeeder
    {
        Task SeedAsync(); 
    }
}