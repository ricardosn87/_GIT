using RichardInvestments.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RichardInvestments.Domain.Services
{
    public class EarnService: IEarnService
    {
        public async Task<decimal> GetFutureValue(decimal presentValue, int rate, int period)
        {
            var resultRate = 1 + rate;
            var pow = Math.Pow(resultRate, period);
            return presentValue + (decimal)pow;
        }
    }
}
