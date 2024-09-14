using Microsoft.EntityFrameworkCore;
using ShoplyBack.Models;

namespace ShoplyBack.DbContexts
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(10,2)");


            base.OnModelCreating(modelBuilder);
        }
    }
}
