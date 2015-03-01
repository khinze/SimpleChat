using System;
using System.Runtime.Serialization;

namespace SimpleChat.Api.Events
{
    [DataContract(Name = "ChatReceived")]
    public class ChatReceived : IEvent
    {
        [DataMember(Name = "FromUserId")]
        public Guid FromUserId { get; protected set; }

        [DataMember(Name = "FromNickName")]
        public string FromNickName { get; protected set; }

        [DataMember(Name = "ToUserId")]
        public Guid ToUserId { get; protected set; }

        [DataMember(Name = "ToNickName")]
        public string ToNickName { get; protected set; }

        [DataMember(Name = "Message")]
        public string Message { get; protected set; }

        [DataMember(Name = "Created")]
        public DateTime Created { get; protected set; }

        public ChatReceived(Guid fromUserId, string fromNickName, Guid toUserId, string toNickName, string message)
        {
            FromUserId = fromUserId;
            FromNickName = fromNickName;
            ToUserId = toUserId;
            ToNickName = toNickName;
            Message = message;
            Created = DateTime.Now;
        }
    }
}