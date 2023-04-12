using Microsoft.AspNetCore.SignalR;

namespace Base64Converter.Hub
{
    public class HubClient : Hub<IHubClient>
    {

        public async Task SendDecodedText(string text)
        {
            await Clients.All.SendDecodedText(text);

        }

  

    }
}
