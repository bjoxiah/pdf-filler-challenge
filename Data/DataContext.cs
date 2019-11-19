using DotnetCore.Model;
using Microsoft.EntityFrameworkCore;

namespace DotnetCore.Data
{
    public class DataContext : DbContext 
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<User> User { get; set; }
        public DbSet<Applicant> Applicant { get; set; }
    }
}