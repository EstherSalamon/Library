using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BookLibrary.Data
{
    public class BookRepository
    {
        private readonly string _connection;

        public BookRepository(string connection)
        {
            _connection = connection;
        }

        public void AddBook(Book book)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            context.Books.Add(book);
            context.SaveChanges();
        }

        //public void AddManyBooks(List<Book> books)
        //{
        //    using LibraryDataContext context = new LibraryDataContext(_connection);
        //    context.Books.AddRange(books);
        //    context.SaveChanges();
        //}

        public Book GetById(int id)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            return context.Books.FirstOrDefault(b => b.Id == id);
        }

        public void UpdateBook(Book book)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            context.Books.Update(book);
            context.SaveChanges();
        }

        public List<Book> GetAllBooks()
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            return context.Books.ToList();
        }

        public List<Book> SearchBooks(string search)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            return context.Books.Where(b => b.Tags.ToLower().Contains(search.ToLower())).ToList();
        }

        public ResultStatus BorrowBook(int bookId, int userId)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            Book book = context.Books.FirstOrDefault(b => b.Id == bookId);
            User user = context.Users.FirstOrDefault(u => u.Id == userId);
            int userTotal = context.Transactions.Where(t => t.UserId == userId && t.Returned == false).Count();
            int totalAvailable = context.Transactions.Where(t => t.BookId == bookId && t.Returned == false).Count();

            if (book != null && user != null && userTotal < 8 && totalAvailable > 0)
            {
                LendingAction lending = new LendingAction
                {
                    BookId = bookId,
                    UserId = userId,
                    DateBorrowed = DateTime.Now,
                    Returned = false
                };

                context.Transactions.Add(lending);
                context.SaveChanges();
                return ResultStatus.Success;
            }
            else
            {
                if(book == null)
                {
                    return ResultStatus.InvalidBook;
                } 
                else if(user == null)
                {
                    return ResultStatus.InvalidUser;
                } 
                else if(userTotal >= 8)
                {
                    return ResultStatus.UserMaxedOut;
                } 
                else if(totalAvailable <= 0)
                {
                    return ResultStatus.BookUnavailable;
                }
                else
                {
                    return ResultStatus.UnknownError;
                }
            }
        }

        public ResultStatus ReturnBook(int bookId, int userId)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            LendingAction lent = context.Transactions.FirstOrDefault(t => t.BookId == bookId && t.UserId == userId && t.Returned == false);

            if(lent is not null)
            {
                lent.DateReturned = DateTime.Now;
                lent.Returned = true;
                context.Transactions.Update(lent);
                context.SaveChanges();
                return ResultStatus.Success;
            }
            else
            {
                return ResultStatus.InvalidTransaction;
            }
        }

        public ResultStatus RenewBook(int bookId, int userId)
        {
            using LibraryDataContext context = new LibraryDataContext(_connection);
            LendingAction lent = context.Transactions.FirstOrDefault(t => t.BookId == bookId && t.UserId == userId && t.Returned == false);
            if(lent is not null)
            {
                ResultStatus status = ReturnBook(bookId, userId);
                if(status == ResultStatus.Success)
                {
                    ResultStatus statusII = BorrowBook(bookId, userId);
                    if (statusII == ResultStatus.Success)
                    {
                        return ResultStatus.Success;
                    }
                    else
                    {
                        return ResultStatus.UnknownError;
                    }
                }
                else
                {
                    return ResultStatus.UnknownError;
                }
            }
            else
            {
                return ResultStatus.InvalidTransaction;
            }
        }

        public List<string> GetAllTags()
        {
            List<string> allTags = new List<string>();
            using LibraryDataContext context = new LibraryDataContext(_connection);
            allTags = context.Books.SelectMany(b => b.TagsList).ToList();
            List<string> filteredTags = new List<string>();
            foreach(string s in allTags)
            {
                if(!filteredTags.Contains(s))
                {
                    filteredTags.Add(s);
                }
            }

            return filteredTags;
        }

        //ve a dbset of people and a dbset of allbooks, and when add person/book, it checks if it exists and if not, adds it to list and if yeah, uses that id, so that when 'checkout', can get list of books for autocomplete, which searches
    }
}
