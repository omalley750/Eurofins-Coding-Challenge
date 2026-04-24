using BikeShop.Domain.Entities;

namespace BikeShop.Domain.Interfaces
{
    public interface IBikeRepository
    {
        Task<IReadOnlyList<Bike>> GetBikesAsync();
        Task AddBikeAsync(Bike bike);
        Task<Bike?> GetBikeByReferenceAsync(Guid reference);
        Task SaveChangesAsync();
    }
}