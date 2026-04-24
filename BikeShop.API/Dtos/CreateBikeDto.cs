using System.ComponentModel.DataAnnotations;

namespace BikeShop.API.Dtos
{
    public class CreateBikeDto
    {
        [Required]
        [MaxLength(100)]
        public string Manufacturer { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Model { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "Price must have at most 2 decimal places")]
        [Range(typeof(decimal), "0.01", "999999.99", ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }

        [Required]
        [MaxLength(100)]
        public string Colour { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "Weight must have at most 2 decimal places")]
        [Range(typeof(decimal), "0.01", "999.99", ErrorMessage = "Weight must be greater than 0")]
        public decimal Weight { get; set; }

        [Required]
        [MaxLength(255)]
        [RegularExpression(@"^(https?:\/\/[^\s]+|\/assets\/images\/[^\s]+)$",
            ErrorMessage = "Enter a valid image URL (http/https) or local path starting with /assets/images/")]
        public string ImageUrl { get; set; } = string.Empty;
    }
}