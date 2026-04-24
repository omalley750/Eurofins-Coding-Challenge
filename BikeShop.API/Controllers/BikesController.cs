using BikeShop.API.Dtos;
using BikeShop.Domain.Entities;
using BikeShop.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BikesController : ControllerBase
{
    private readonly IBikeRepository _bikeRepository;

    public BikesController(IBikeRepository bikeRepository)
    {
        _bikeRepository = bikeRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<BikeResponseDto>>> GetBikesAsync()
    {
        var bikes = await _bikeRepository.GetBikesAsync();
        return Ok(bikes.Select(MapToDto));
    }

    private static BikeResponseDto MapToDto(Bike bike) => new()
    {
        Reference = bike.Reference,
        Manufacturer = bike.Manufacturer,
        Model = bike.Model,
        Category = bike.Category,
        Price = bike.Price,
        Colour = bike.Colour,
        Weight = bike.Weight,
        ImageUrl = bike.ImageUrl
    };
}