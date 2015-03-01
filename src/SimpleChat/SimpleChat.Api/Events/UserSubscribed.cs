using System;
using System.Runtime.Serialization;

namespace SimpleChat.Api.Events
{
    [DataContract(Name = "UserSubscribed")]
    public class UserSubscribed : IEvent
    {
        [DataMember(Name = "Id")]
        public Guid ConnectionId { get; protected set; }

        [DataMember(Name = "NickName")]
        public string NickName { get; protected set; }

        public UserSubscribed(Guid connectionId, string nickName)
        {
            ConnectionId = connectionId;
            NickName = nickName;
        }
    }
}