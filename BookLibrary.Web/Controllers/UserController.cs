using BookLibrary.Data;
using BookLibrary.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly string _connection;

        public UserController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getall")]
        public List<FullUser> GetAllUsers()
        {
            UserRepository repo = new UserRepository(_connection);
            List<User> users = repo.GetAllUsers();
            List<FullUser> fullUsers = new List<FullUser>();
            foreach(User u in users)
            {
                FullUser full = new FullUser
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                    OutstandingBooks = repo.OutstandingBooksByUser(u.Id)
                };
                fullUsers.Add(full);
            }
            return fullUsers;
        }

        [HttpPost]
        [Route("add")]
        public void AddUser(UserVM vm)
        {
            UserRepository repo = new UserRepository(_connection);
            repo.AddUser(vm.User);
        }

        [HttpGet]
        [Route("specific")]
        public User GetById(int id)
        {
            UserRepository repo = new UserRepository(_connection);
            return repo.GetById(id);
        }

        [HttpPost]
        [Route("update")]
        public void UpdateUser(UserVM vm)
        {
            UserRepository repo = new UserRepository(_connection);
            repo.UpdateUser(vm.User);
        }

    }
}
