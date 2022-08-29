using System.Collections.Generic;

namespace SexFriend.Core.Communication
{
    public class ResponseResult
    {
        public ResponseResult()
        {
            Errors = new RespoSexFriendErrorMessages();
        }

        public string Title { get; set; }
        public int Status { get; set; }
        public RespoSexFriendErrorMessages Errors { get; set; }
    }

    public class RespoSexFriendErrorMessages
    {
        public RespoSexFriendErrorMessages()
        {
            Mensagens = new List<string>();
        }

        public List<string> Mensagens { get; set; }
    }
}