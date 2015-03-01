using System.Net;
using System.Net.Http;
using System.Web.Http;
using SimpleChat.Api.Repository;

namespace SimpleChat.Api.Controllers
{
    public class UserController : ApiController
    {
        private readonly InMemoryUserRepository inMemoryUserRepository;

        public UserController(InMemoryUserRepository inMemoryUserRepository)
        {
            this.inMemoryUserRepository = inMemoryUserRepository;
        }

        [Route("api/Users")]
        public HttpResponseMessage GetUsers()
        {
            var users = inMemoryUserRepository.All();

            return Request.CreateResponse(HttpStatusCode.OK, users);
        }
    }
}