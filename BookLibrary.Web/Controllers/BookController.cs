using BookLibrary.Data;
using BookLibrary.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.X86;

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
            int commaIndex = vm.Book.Base64.IndexOf(",");
            string base64 = vm.Book.Base64.Substring(commaIndex + 1);
            byte[] bytes = Convert.FromBase64String(base64);
            Guid guid = Guid.NewGuid();
            //string imgUrl = $"{vm.Book.Title} - {guid}";
            System.IO.File.WriteAllBytes($"Images/{guid}", bytes);
            vm.Book.Img = guid.ToString();
            Console.WriteLine(vm.Book.Img);

            repo.AddBook(vm.Book);
        }

        //[HttpPost("addimg")]
        //public void JustImg(string base64)
        //{
        //    int indexOfComma = base64.IndexOf(",");
        //    string just64 = base64.Substring(indexOfComma + 1);
        //    byte[] bytes = Convert.FromBase64String(just64);
        //    string title = Guid.NewGuid().ToString();
        //    System.IO.File.WriteAllBytes($"Images/{title}", bytes);
        //}

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

        [HttpGet]
        [Route("alltags")]
        public List<string> GetAllTags()
        {
            BookRepository repo = new BookRepository(_connection);
            return repo.GetAllTags();
        }

        [HttpGet]
        [Route("getimg")]
        public IActionResult GetImg(string img)
        {
            byte[] bytes = System.IO.File.ReadAllBytes($"Images/{img}");
            return File(bytes, "image/jpg");
        }
    }
}
