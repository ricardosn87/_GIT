using FluentValidation.Results;

namespace SexFriend.Core.Messages.Integration
{
    public class RespoSexFriendMessage : Message
    {
        public ValidationResult ValidationResult { get; set; }

        public RespoSexFriendMessage(ValidationResult validationResult)
        {
            ValidationResult = validationResult;
        }
    }
}