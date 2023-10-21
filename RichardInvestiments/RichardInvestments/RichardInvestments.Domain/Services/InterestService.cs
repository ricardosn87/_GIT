using RichardInvestments.Domain.Enums;
using RichardInvestments.Domain.Interfaces.Services;

namespace RichardInvestments.Domain.Services
{
    public class InterestService: IInterestService
    {
        public async Task<decimal> Simple(decimal amount, decimal tax, int period)
        {           
            return amount * tax * period;
        }

        public async Task<decimal> Compounds(decimal amount, decimal tax, int period)
        {
            for (int i = 0; i < period; i++)
            {
                decimal valueFuture = amount + (tax * amount);
                amount = valueFuture;
            }
            return amount;
        }

        public async Task<decimal> Continuos(decimal amount, decimal tax, int period)
        {
            decimal fatorial =  tax * period;
            double ValueFuture = (double)amount * Math.Pow((double)EnumEuller.Valor, (double)fatorial);
            return (decimal)ValueFuture;
        }        
    }
}
