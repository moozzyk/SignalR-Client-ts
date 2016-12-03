using System.IO;
using System.Reflection;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;

[assembly: OwinStartup(typeof(SignalRTestServer.Startup))]

namespace SignalRTestServer
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseErrorPage();
            app.Map("/raw-connection", map => map.RunSignalR<RawConnection>());
            app.MapSignalR();
            app.UseFileServer(new FileServerOptions
            {
                FileSystem = new PhysicalFileSystem(
                    Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "wwwroot"))
            });
        }
    }
}
