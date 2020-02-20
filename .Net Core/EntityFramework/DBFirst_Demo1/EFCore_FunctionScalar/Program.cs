using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EFCore_FunctionScalar
{
    public class Customer
    {
        [Key]
        public string CustomerId { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }

        [ConcurrencyCheck]
        public string Country { get; set; }
    }
    public class AppContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=Northwind;Integrated Security=True");
        }

        [DbFunction(Schema = "dbo")]
        public static string RetornoTexto(string texto)
        {
            return "";
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            using(var db = new AppContext())
            {
                var r = db.Customers.Where(x => x.Country == AppContext.RetornoTexto("Mexico"));
                    
            }
            Console.ReadKey();
        }
    }
}
