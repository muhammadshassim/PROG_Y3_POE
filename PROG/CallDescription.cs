namespace PROG;

public class CallDescription
{
    public CallDescription(int callNumber, string description)
    {
        CallNumber = callNumber;
        Description = description;
    }
    public int CallNumber { get; set; }
    public string Description { get; set; }
}