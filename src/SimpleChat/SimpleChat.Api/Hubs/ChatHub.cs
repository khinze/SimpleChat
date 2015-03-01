using System;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using SimpleChat.Api.Events;
using SimpleChat.Api.Messaging;
using SimpleChat.Api.Repository;

namespace SimpleChat.Api.Hubs
{
    public class ChatHub : Hub
    {
        public void SubscribeUser(string nickName)
        {
            var signalRPublisher = new SignalRPublisher();
            var inMemoryRepository = new InMemoryUserRepository();

            inMemoryRepository.Add(new User
            {
                Id = Guid.Parse(Context.ConnectionId),
                NickName = nickName
            });

            signalRPublisher.Publish(new UserSubscribed(Guid.Parse(Context.ConnectionId), nickName));
        }

        public void SendMessageToUser(string userId, string message)
        {
            var signalRPublisher = new SignalRPublisher();
            var inMemoryRepository = new InMemoryUserRepository();

            var currentUser = inMemoryRepository.Get(Guid.Parse(Context.ConnectionId));
            var toUser = inMemoryRepository.Get(Guid.Parse(userId));

            signalRPublisher.Send(currentUser.Id, BuildChatReceived(currentUser, toUser, message));
            signalRPublisher.Send(toUser.Id, BuildChatReceived(currentUser, toUser, message));
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var inMemoryRepository = new InMemoryUserRepository();

            inMemoryRepository.Remove(Guid.Parse(Context.ConnectionId));

            return base.OnDisconnected(stopCalled);
        }

        private static ChatReceived BuildChatReceived(User currentUser, User toUser, string message)
        {
            return new ChatReceived(currentUser.Id, currentUser.NickName, toUser.Id, toUser.NickName, message);
        }
    }
}