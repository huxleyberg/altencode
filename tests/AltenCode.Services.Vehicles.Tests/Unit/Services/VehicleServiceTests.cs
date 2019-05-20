using System;
using System.Threading.Tasks;
using AltenCode.Services.Vehicles.Domain.Models;
using AltenCode.Services.Vehicles.Domain.Repositories;
using AltenCode.Services.Vehicles.Services;
using Moq;
using Xunit;

namespace AltenCode.Services.Vehicles.Tests.Unit.Services
{
    public class VehicleServiceTests
    {
        [Fact]
        public async Task activity_service_add_async_should_succeed()
        {
            var vehicleRepositoryMock = new Mock<IVehicleRepository>();

            var activityService = new VehicleService(vehicleRepositoryMock.Object);

            var id = Guid.NewGuid();
            var vin = "ERYTTYU12345";
            var regno = "123456";
            var customerid = Guid.NewGuid().ToString();
            var status = "connected";
            await activityService.AddAsync(id, vin, regno, customerid, status);

            vehicleRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Vehicle>()), Times.Once);
        }
    }
}