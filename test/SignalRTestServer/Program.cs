
using System;
using Microsoft.Owin.Hosting;

namespace SignalRTestServer
{
    class Program
    {
        static void Main(string[] args)
        {
            string url = "http://localhost:5499";
            using (WebApp.Start(url))
            {
                Console.WriteLine("Server running on {0}", url);
                Console.ReadLine();
            }
        }
    }
}
