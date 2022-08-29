using System;
using SexFriend.Core.DomainObjects;

namespace SexFriend.Core.Data
{
    public interface IRepository<T> : IDisposable where T : IAggregateRoot
    {
        IUnitOfWork UnitOfWork { get; }
    }
}