using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace SignalRTestServer
{
    class RawConnection : PersistentConnection
    {
        protected override Task OnReceived(IRequest request, string connectionId, string data)
        {
            return Connection.Send(connectionId, data);
        }
    }
}
