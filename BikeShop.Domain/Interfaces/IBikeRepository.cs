using BikeShop.Domain.Entities;

namespace BikeShop.Domain.Interfaces
{
    public interface IBikeRepository
    {
        Task<IReadOnlyList<Bike>> GetBikesAsync();
    }
}