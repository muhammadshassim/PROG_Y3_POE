using System.Collections;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Cors;

namespace PROG.Controllers;

[ApiController]
[EnableCors(origins: "*", headers: "*", methods: "*")]
[Route("[controller]")]
public class CallDescriptionController : ControllerBase
{
    private Dictionary<int, CallDescription> _callNumberDescription = new Dictionary<int, CallDescription>
    {
        { 1, new CallDescription(000, "Computer Science, Information, & General Works") },
        { 2, new CallDescription(100, "Philosophy & Psychology") },
        { 3, new CallDescription(200, "Religion") },
        { 4, new CallDescription(300, "Social Sciences") },
        { 5, new CallDescription(400, "Language") },
        { 6, new CallDescription(500, "Pure Science") },
        { 7, new CallDescription(600, "Technology") },
        { 8, new CallDescription(700, "Arts & Recreation") },
        { 9, new CallDescription(800, "Literature") },
        { 10, new CallDescription(900, "History & Geography") }
    };

    [HttpGet]
    [Route("GetAll")]
    public IEnumerable<CallDescription> Get()
    {
        List<int> ID = new List<int>();
        List<CallDescription> callDescription = new List<CallDescription>();
        foreach(KeyValuePair<int, CallDescription> entry in _callNumberDescription)
        {
            ID.Add(entry.Key);
            callDescription.Add(entry.Value);
        }

        Console.WriteLine("Request received");
        return callDescription;
    }
}