using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeShop.API.Dtos
{
    public class BikeResponseDto
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