using Microsoft.EntityFrameworkCore.Query.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Data
{
    public class UserRepository
    {
        private readonly string _connection;

        public UserRepository(string connection)
        {
            _connection = connection;
        }

        public List<User> GetAllUsers()
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            return context.Users.ToList();
        }

        public void AddUser(User user)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User GetById(int id)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            return context.Users.FirstOrDefault(u => u.Id == id);
        }

        public void UpdateUser(User user)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            context.Users.Update(user);
            context.SaveChanges();
        }

        public int OutstandingBooksByUser(int id)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            return context.Transactions.Where(t => t.UserId == id && t.Returned == false).Count();
        }
    }
}
