using BookLibrary.Data;

namespace BookLibrary.Web.ViewModels
{
    public class FullUser : User
    {
        public int OutstandingBooks { get; set; }
    }
}
