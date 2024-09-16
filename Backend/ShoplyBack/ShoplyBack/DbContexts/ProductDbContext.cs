using Microsoft.EntityFrameworkCore;
using ShoplyBack.Models;

namespace ShoplyBack.DbContexts
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<DeviceModel> DeviceModels { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(10,2)");

            modelBuilder.Entity<Category>()
                .HasMany(c => c.Products)
                .WithOne(p => p.Category)
                .HasForeignKey(p => p.CategoryId);

            modelBuilder.Entity<DeviceModel>()
               .HasMany(d => d.Products)
               .WithOne(p => p.DeviceModel)
               .HasForeignKey(p => p.DeviceModelId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
