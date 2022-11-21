namespace PROG;

public class Book
{
    public Book(int bookID, string title, int callNumber, string description)
    {
        BookID = bookID;
        Title = title;
        CallNumber = callNumber;
        Description = description;
    }
    public int BookID { get; set; }
    public string Title { get; set; }
    public int CallNumber { get; set; }
    public string Description { get; set; }

}