using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Wallet.Models
{
    public class Transaccion
    {
        public int Id { get; set; }

        public string Tipo { get; set; } 

        public decimal MontoARS { get; set; } 

        public decimal Cantidad { get; set; }
        public DateTime ?FechaHora { get; set; }

        public int MonedaId { get; set; }

        
        public Moneda? moneda { get; set; }
    }

}
