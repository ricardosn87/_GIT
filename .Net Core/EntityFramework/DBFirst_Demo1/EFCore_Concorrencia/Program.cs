using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel.DataAnnotations;

namespace EFCore_Concorrencia
{

    public class AppDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=Northwind;Integrated Security=True");

            optionsBuilder.EnableSensitiveDataLogging(true)
                .UseLoggerFactory(new LoggerFactory().AddConsole((categoy, level) =>
                level == LogLevel.Information &&
                categoy == DbLoggerCategory.Database.Command.Name, true));
        }
    }

    public class Customer
    {
        [Key]
        public string CustomerId { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }

        [ConcurrencyCheck]
        public string Country { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {


            using (var db = new AppDbContext())
            {
                var c = db.Customers.Find("ALFKI");
                c.Country = "Olaria";

                db.Database.ExecuteSqlRaw("UPDATE DBO.CUSTOMERS SET COUNTRY = 'Brasil' WHERE CUSTOMERID = 'ALFKI'");

                ExibirrEstadoEntidae(c, db);

                var salvo = false;
                while (!salvo)
                {
                    try
                    {
                        db.SaveChanges();
                        salvo = true;
                    }
                    catch (DbUpdateConcurrencyException ex)
                    {
                        foreach (var entry in ex.Entries)
                        {
                            if (entry.Entity is Customer)
                            {
                                var proposedValues = entry.CurrentValues;
                                var databaseValues = entry.GetDatabaseValues();

                                foreach (var property in proposedValues.Properties)
                                {
                                    var proposedValue = proposedValues[property];
                                    var databaseValue = databaseValues[property];

                                    // TODO: decide which value should be written to database
                                    // proposedValues[property] = <value to be saved>;
                                }

                                // Refresh original values to bypass next concurrency check
                                entry.OriginalValues.SetValues(databaseValues);
                            }
                            else
                            {
                                throw new NotSupportedException(
                                    "Don't know how to handle concurrency conflicts for "
                                    + entry.Metadata.Name);
                            }
                        }
                    }
                }              
            }

            Console.ReadKey();
        }

        private static void ExibirrEstadoEntidae<T>(T defaultValue, AppDbContext appContext)
        {
            var entry = appContext.Entry(defaultValue);
            Console.WriteLine(entry.Entity.GetType().Name + " - " + entry.State);
        }
    }
}
