using RichardInvestments.Domain.Interfaces.Services;

namespace RichardInvestments.Domain.Services
{
    public class RatesService : IRatesService
    {
        public async Task<decimal> Equivalence(decimal rate, int havePeridod, int wantPeriod)
        {
            decimal rateSum = 1 + rate / 100;
            decimal pow = wantPeriod / havePeridod;
            var poten = Math.Pow((double)rateSum, (double)pow);
            var result =  (decimal)poten - 1;
            return result * 100;
        }

        public async Task<decimal> InterestRealAndNominal(decimal selic,decimal ipca)
        {
            var selicResult = 1 + selic;
            var ipcaResult = 1 + ipca;
            var resultDivide = (selicResult / ipcaResult) - 1;
            return resultDivide * 100;
        }
    }
}