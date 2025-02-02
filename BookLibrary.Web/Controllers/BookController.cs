using BookLibrary.Data;
using BookLibrary.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly string _connection;

        public BookController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");   
        }

        [HttpGet]
        [Route("getall")]
        public List<Book> GetAllBooks()
        {
            BookRepository repo = new BookRepository(_connection);
            return repo.GetAllBooks();
        }

        [HttpPost]
        [Route("add")]
        public void AddBook(BookVM vm)
        {
            BookRepository repo = new BookRepository(_connection);
            repo.AddBook(vm.Book);
        }

        [HttpGet]
        [Route("specific")]
        public Book GetById(int id)
        {
            BookRepository repo = new BookRepository(_connection);
            return repo.GetById(id);
        }

        [HttpPost]
        [Route("update")]
        public void UpdateBook(BookVM vm)
        {
            BookRepository repo = new BookRepository(_connection);
            repo.UpdateBook(vm.Book);
        }
    }
}
