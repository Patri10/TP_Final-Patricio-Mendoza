using Microsoft.EntityFrameworkCore;
namespace API_Wallet.Datos
{
    public class Contextdb:DbContext
    {
        public Contextdb(DbContextOptions<Contextdb> options) : base(options)
        {
        }
        public DbSet<Models.Transaccion> Transaccion { get; set; }
        public DbSet<Models.Moneda> Monedas { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.Transaccion>()
                .HasOne(t => t.moneda)
                .WithMany()
                .HasForeignKey(t => t.MonedaId);
  
        }
    }
}
