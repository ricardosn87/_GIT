using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFCore_Configuracao
{
    class ProdutoContext : DbContext
    {

        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-LGNHMBN4\SQLEXPRESS;Initial Catalog=Configuracao;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Produto>().Property(t => t.Descricao).IsRequired().HasMaxLength(200);
        }
    }
    [Table("NovosProdutos",Schema = "Admin")]
    class Produto
    {
        public int ProdutoId { get; set; }

        [Column("NomeProduto", TypeName ="Varchar(50)")]
        public string Nome { get; set; }
        public decimal Preco { get; set; }
        public int Estoque { get; set; }

        //[Required]
        //[StringLength(200)]
        public string Descricao { get; set; }

    }


    public class Categoria
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Codigo { get; set; }
        public string Nome { get; set; }

        [NotMapped]
        public bool ForaEstoque { get; set; }

        [Required]
        [MaxLength(200,ErrorMessage ="Valor Tamanho Maior")]
        public string Descricao { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
