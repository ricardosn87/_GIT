namespace RichardInvestments.Domain.Interfaces.Services
{
    public interface IInterestService
    {
        Task<decimal> Simple(decimal amount, decimal tax, int period);
        Task<decimal> Compounds(decimal amount, decimal tax, int period);
        Task<decimal> Continuos(decimal amount, decimal tax, int period);
    }
}
