using System;
using System.Collections.Generic;
using System.Linq;
using SimpleChat.Api.Exceptions;

namespace SimpleChat.Api.Repository
{
    public class InMemoryUserRepository
    {
        private static readonly Dictionary<Guid, User> UserRepository = new Dictionary<Guid, User>();

        public User Get(Guid userId)
        {
            if (UserRepository.ContainsKey(userId))
                return UserRepository[userId];

            throw new MissingDataException("The user you are looking for does not exist.");
        }

        public void Add(User user)
        {
            if(!UserRepository.ContainsKey(user.Id))
                UserRepository.Add(user.Id, user);
        }

        public void Remove(Guid connectionId)
        {
            if (UserRepository.ContainsKey(connectionId))
                UserRepository.Remove(connectionId);
        }

        public IEnumerable<User> All()
        {
            return UserRepository.Select(c => c.Value);
        }
    }
}