using BikeShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Infrastructure.Data
{
    public class BikeShopContext(DbContextOptions<BikeShopContext> options) : DbContext(options)
    {
        public DbSet<Bike> Bikes { get; set; }
    }
    
}