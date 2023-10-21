namespace RichardInvestments.Domain.Interfaces.Services
{
    public interface IRatesService
    {
        Task<decimal> Equivalence(decimal rate, int havePeriod, int wantPeriod);
        Task<decimal> InterestRealAndNominal(decimal selic, decimal ipca);
    }
}
