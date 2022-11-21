using System.Collections;
using Microsoft.AspNetCore.Mvc;

namespace PROG.Controllers;

[ApiController]
[Route("[controller]")]
public class BookController : ControllerBase
{
    // Book array
    private static List<Book> _books = new List<Book>()
    {
        new Book(123, "Title", 123, "Desc")
    };

    private readonly ILogger<BookController> _logger;

    public BookController(ILogger<BookController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("GetAll")]
    public IEnumerable<Book> Get()
    {
        return _books;
    }
    
    [HttpPost]
    public ActionResult<string> Post([FromBody] string weatherForecast)
    {
        Console.WriteLine(weatherForecast);
        return weatherForecast + " returned from the Web API";
    }
}