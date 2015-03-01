using System;

namespace SimpleChat.Api.Exceptions
{
    public class MissingDataException : Exception
    {
        public MissingDataException(string message) : base(message){}
    }
}