using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BikeShop.Domain.Entities;
using BikeShop.Domain.Interfaces;
using BikeShop.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Infrastructure.Repositories
{
    public class BikeRepository : IBikeRepository
    {
        private readonly BikeShopContext _context;

        public BikeRepository(BikeShopContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<Bike>> GetBikesAsync()
        {
            return await _context.Bikes.AsNoTracking().ToListAsync();
        }

        public async Task AddBikeAsync(Bike bike)
        {
            await _context.Bikes.AddAsync(bike);
        }

        public async Task<Bike?> GetBikeByReferenceAsync(Guid reference)
        {
            return await _context.Bikes.AsNoTracking().FirstOrDefaultAsync(b => b.Reference == reference);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}