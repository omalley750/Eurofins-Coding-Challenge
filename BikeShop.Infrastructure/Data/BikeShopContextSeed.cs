using System.Globalization;
using System.Text.Json;
using BikeShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Infrastructure.Data
{
    public static class BikeShopContextSeed
    {
        public static async Task SeedAsync(BikeShopContext context)
        {
            if (await context.Bikes.AnyAsync())
            {
                return;
            }

            var bikeData = await File.ReadAllTextAsync("../BikeShop.Infrastructure/Data/SeedData/bikes.json");
            var bikesJson = JsonSerializer.Deserialize<List<BikeSeedDto>>(bikeData);
            if (bikesJson == null || bikesJson.Count == 0)
            {
                return;
            }

            var bikes = bikesJson.Select(b => new Bike
            {
                Reference = Guid.Parse(b.Reference),
                Manufacturer = b.Manufacturer,
                Model = b.Model,
                Category = b.Category,
                Price = ParsePrice(b.Price),
                Colour = b.Colour,
                Weight = ParseWeight(b.Weight),
                ImageUrl = b.ImageUrl

            });

            context.Bikes.AddRange(bikes);
            await context.SaveChangesAsync();
        }

        private static decimal ParsePrice(string price)
        {
            return decimal.Parse(
                price.Replace("€", string.Empty).Replace(",", string.Empty),
                CultureInfo.InvariantCulture);
        }

        private static decimal ParseWeight(string weight)
        {
            return decimal.Parse(
                weight.Replace("kg", string.Empty),
                CultureInfo.InvariantCulture);
        }
    }
}