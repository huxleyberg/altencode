using System.Threading.Tasks;

namespace AltenCode.Common.Mongo
{
    public interface IDatabaseInitializer
    {
        Task InitializeAsync();
    }
}