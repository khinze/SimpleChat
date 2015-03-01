using System;
using Microsoft.AspNet.SignalR;
using SimpleChat.Api.Events;

namespace SimpleChat.Api.Messaging
{
    public class SignalRPublisher
    {
        public void Publish(IEvent @event)
        {
            var hub = GlobalHost.ConnectionManager.GetHubContext<Hubs.ChatHub>();
            
            hub.Clients.All.RaiseEvent(ToEvent(@event));
        }

        public void Send(Guid connectionId, IEvent @event)
        {
            var hub = GlobalHost.ConnectionManager.GetHubContext<Hubs.ChatHub>();

            hub.Clients.Client(connectionId.ToString()).RaiseEvent(ToEvent(@event));
        }

        private static object ToEvent(IEvent @event)
        {
            return new 
            {
                Type = @event.GetType().Name,
                Body = @event
            };
        }
    }
}