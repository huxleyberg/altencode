using AltenCode.Api.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace AltenCode.Api.Tests.Unit.Controllers
{
    public class HomeControllerTests
    {
        [Fact]
        public void home_controller_get_should_return_string_content()
        {
            var homecontroller = new HomeController();

            var result = homecontroller.Get();

            var contentResult = result as ContentResult;

            contentResult.Should().NotBeNull();

            contentResult.Content.Should().BeEquivalentTo("Welcome from AltenCode API!");
        }
    }
}