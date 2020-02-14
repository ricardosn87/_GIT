using System;
using System.Collections.Generic;

namespace DBFirst_ScaffoldDbContext.Models
{
    public partial class OrderSubtotals
    {
        public int OrderId { get; set; }
        public decimal? Subtotal { get; set; }
    }
}
