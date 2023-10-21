using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RichardInvestments.Domain.Interfaces.Services
{
    public interface IEarnService
    {
        Task<decimal> GetFutureValue(decimal presentValue, int rate, int period);
    }
}
