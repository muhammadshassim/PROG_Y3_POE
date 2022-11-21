using Newtonsoft.Json;

namespace PROG.Models;

public class Classes
{
    public string ID { get; set; }
    public string Title { get; set; }
    public List<Category> Categories { get; set; }
    
    public static List<Classes> MapToClass(string filename)
    {
        using (StreamReader r = new StreamReader(filename))
        {
            string json = r.ReadToEnd();
            List<Classes> items = JsonConvert.DeserializeObject<List<Classes>>(json);
            return items;
        }
    }
}

public class Category
{
    public string ID { get; set; }
    public List<SubCategory> SubCategories { get; set; }
}

public class SubCategory
{
    public string ID { get; set; }
    public string Title { get; set; }
}