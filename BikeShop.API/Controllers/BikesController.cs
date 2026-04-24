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

    [HttpGet("{reference}")]
    public async Task<ActionResult<BikeResponseDto>> GetBikeByReferenceAsync(Guid reference)
    {
        var bike = await _bikeRepository.GetBikeByReferenceAsync(reference);
        if (bike == null)
        {
            return NotFound();
        }
        return Ok(MapToDto(bike));
    }

    [HttpPost]
    public async Task<ActionResult<BikeResponseDto>> CreateBikeAsync(CreateBikeDto createBikeDto)
    {
        var bike = new Bike
        {
            Reference = Guid.NewGuid(),
            Manufacturer = createBikeDto.Manufacturer,
            Model = createBikeDto.Model,
            Category = createBikeDto.Category,
            Price = createBikeDto.Price,
            Colour = createBikeDto.Colour,
            Weight = createBikeDto.Weight,
            ImageUrl = createBikeDto.ImageUrl
        };

        await _bikeRepository.AddBikeAsync(bike);
        await _bikeRepository.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBikeByReferenceAsync), new { reference = bike.Reference }, MapToDto(bike));
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