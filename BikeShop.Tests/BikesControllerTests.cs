using BikeShop.API.Controllers;
using BikeShop.API.Dtos;
using BikeShop.Domain.Entities;
using BikeShop.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace BikeShop.Tests;
public class BikesControllerTests
{
    private readonly Mock<IBikeRepository> _repoMock = new();
    private readonly BikesController _controller;

    private static readonly Bike TestBike = new()
    {
        Reference = new Guid("07e9548b-f35e-4e00-99d7-e49b5fb08907"),
        Manufacturer = "Carrera",
        Model = "Karkinos",
        Category = "Mountain Bike",
        Price = 415.00m,
        Colour = "Red",
        Weight = 14m,
        ImageUrl = "/assets/images/bikes/Carrera-Karkinos-Mountain-Bike.png"
    };

    public BikesControllerTests()
    {
        _controller = new BikesController(_repoMock.Object);
    }

    [Fact]
    public async Task GetBikesAsync_Returns200_WithListOfBikes()
    {
        _repoMock.Setup(r => r.GetBikesAsync()).ReturnsAsync(new List<Bike> { TestBike });

        var result = await _controller.GetBikesAsync();

        var ok = Assert.IsType<OkObjectResult>(result.Result);
        var bikes = Assert.IsAssignableFrom<IEnumerable<BikeResponseDto>>(ok.Value);
        Assert.Single(bikes);
        Assert.Equal(TestBike.Reference, bikes.First().Reference);
    }

    [Fact]
    public async Task GetBikeByReferenceAsync_Returns200_WhenBikeExists()
    {
        _repoMock.Setup(r => r.GetBikeByReferenceAsync(TestBike.Reference)).ReturnsAsync(TestBike);

        var result = await _controller.GetBikeByReferenceAsync(TestBike.Reference);

        var ok = Assert.IsType<OkObjectResult>(result.Result);
        var dto = Assert.IsType<BikeResponseDto>(ok.Value);
        Assert.Equal(TestBike.Reference, dto.Reference);
    }

    [Fact]
    public async Task GetBikeByReferenceAsync_Returns404_WhenBikeNotFound()
    {
        _repoMock.Setup(r => r.GetBikeByReferenceAsync(It.IsAny<Guid>())).ReturnsAsync((Bike?)null);

        var result = await _controller.GetBikeByReferenceAsync(Guid.NewGuid());

        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task CreateBikeAsync_Returns201_WithCreatedBike()
    {
        var dto = new CreateBikeDto
        {
            Manufacturer = "Carrera",
            Model = "Karkinos",
            Category = "Mountain Bike",
            Price = 415.00m,
            Colour = "Red",
            Weight = 14m,
            ImageUrl = "/assets/images/bikes/Carrera-Karkinos-Mountain-Bike.png"
        };
        _repoMock.Setup(r => r.AddBikeAsync(It.IsAny<Bike>())).Returns(Task.CompletedTask);
        _repoMock.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        var result = await _controller.CreateBikeAsync(dto);

        var created = Assert.IsType<CreatedAtActionResult>(result.Result);
        var bike = Assert.IsType<BikeResponseDto>(created.Value);
        Assert.Equal(dto.Manufacturer, bike.Manufacturer);
        Assert.Equal(201, created.StatusCode);
    }
}
