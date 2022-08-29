using FluentValidation.Results;
using Microsoft.Extensions.Logging;
using SexFriend.System.Commands;
using System.Threading.Tasks;

namespace SexFriend.System.Mediator
{
    public interface IMediatorHandler
    {
        Task<ValidationResult> EnviarComando<T>(T comando) where T : Command;
    }
}
