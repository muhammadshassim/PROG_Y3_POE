using System.Web.Http.Cors;
using Microsoft.AspNetCore.Mvc;
using PROG.Models;

namespace PROG.Controllers;

[ApiController]
[EnableCors(origins: "*", headers: "*", methods: "*")]
[Route("[controller]")]
public class FindingCallNumbers: ControllerBase
{
    List<Classes> classes = Classes.MapToClass("classes.json");

    [HttpGet]
    [Route("GetAll")]
    public List<Classes> Get()
    {
        Console.WriteLine("Request received");
        Console.WriteLine("Request executed");
        return classes;
    }
    
    [HttpGet]
    [Route("GetRandomThirdLevel")]
    public List<Classes> GetRandomThirdLevel()
    {
        Console.WriteLine("Request received");
        var random = new Random();
        List<int> randomNumbers = new List<int>();
        List<Classes> randomlySelectedClasses = new List<Classes>();
        while (randomlySelectedClasses.Count < 4)
        {
            var randomNumber = random.Next(0, 4);
            if (!randomNumbers.Contains(randomNumber))
            {
                randomNumbers.Add(randomNumber);
                randomlySelectedClasses.Add(classes[randomNumber]);
            }
        }
        
        foreach (var item in randomlySelectedClasses)
        {
            Console.WriteLine("ID: " + item.ID + " Name: " + item.Title);
        }

        Console.WriteLine("Request executed");
        return randomlySelectedClasses;
    }
    
}