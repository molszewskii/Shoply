using Microsoft.EntityFrameworkCore;
using ShoplyBack.Models;

namespace ShoplyBack.DbContexts
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); 
        }
    }
}
