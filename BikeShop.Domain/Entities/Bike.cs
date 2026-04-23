namespace BikeShop.Domain.Entities
{
    public class Bike : BaseEntity
    {
        public Guid Reference { get; set; }
        public string Manufacturer { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Colour { get; set; } = string.Empty;
        public decimal Weight { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}