using System.Collections.Generic;

namespace SexFriend.System.Comunication
{
    public class ResponseResult
    {
        public ResponseResult()
        {
            Errors = new ResponseResultErrorMessages();
        }

        public string Title { get; set; }
        public int Status { get; set; }
        public ResponseResultErrorMessages Errors { get; set; }
    }

    public class ResponseResultErrorMessages
    {
        public ResponseResultErrorMessages()
        {
            Mensagens = new List<string>();
        }

        public List<string> Mensagens { get; set; }
    }
}
