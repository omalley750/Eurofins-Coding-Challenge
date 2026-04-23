using Microsoft.AspNetCore.Mvc;

namespace BikeShop.API.Controllers;

[ApiController]
[Route("[controller]")]
public class BikesController : ControllerBase
{
    [HttpGet]
    public object Get()
    {
        return 0;
    }
}