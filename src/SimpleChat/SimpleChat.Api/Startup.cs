using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using SimpleChat.Api;
using SimpleChat.Api.Repository;

[assembly: OwinStartup(typeof(Startup))]
namespace SimpleChat.Api
{
    public class Startup
    {
        public static class RouteNames
        {
            public static string DefaultApi = "defaultApi";
        }

        public void Configuration(IAppBuilder app)
        {
            var container = new ContainerBuilder();
            container.RegisterApiControllers(Assembly.GetExecutingAssembly()).InstancePerRequest();
            container.RegisterType<InMemoryUserRepository>().InstancePerRequest();
            var builtContainer = container.Build();

            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(ConfigureWebApi(builtContainer));

            app.Map("/signalr", map =>
            {
                var hubConfiguration = new HubConfiguration
                {
                };
                map.RunSignalR(hubConfiguration);
            });

            GlobalConfiguration.Configuration.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(builtContainer);
        }

        private static HttpConfiguration ConfigureWebApi(IContainer container)
        {
            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            config.Routes.MapHttpRoute(
                name: RouteNames.DefaultApi,
                routeTemplate: "api/{controller}/{id}",
                defaults: new
                {
                    id = RouteParameter.Optional
                });
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            return config;
        }
    }
}