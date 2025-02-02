using Microsoft.EntityFrameworkCore;

namespace BookLibrary.Data;

public class LibraryDataContext : DbContext
{
    private readonly string _connectionString;

    public LibraryDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }

    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set;}
    public DbSet<LendingAction> Transactions { get; set; }
}