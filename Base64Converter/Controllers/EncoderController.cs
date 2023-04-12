
using Base64Converter.Hub;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Base64Converter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EncoderController : ControllerBase
    {
        private IHubContext<HubClient, IHubClient> _messageHub;

        public EncoderController(IHubContext<HubClient, IHubClient> messageHub)
        {
            _messageHub = messageHub;
        }

        [HttpPost]
        [Route("encodetext")]
        public async Task<Result> EncodeText([FromBody] Param text)
        {

            var charList = text.Text.ToCharArray().ToList();

            foreach (var item in charList)
            {
                var convertToBase64 = System.Text.Encoding.UTF8.GetBytes(item.ToString());

                var r = System.Convert.ToBase64String(convertToBase64);
                await Task.Delay(new Random().Next(1000, 5000));
                await _messageHub.Clients.All.SendDecodedText(r.Replace("==",""));
            }

            return new Result()
            {
                Status = "OK",
                Mesage = "Successfulle Encoded"
            };
        }


    }

    public class Param
    {
        public string Text { get; set; }    
    };

    public class Result
    {
        public string Status { get; set; }
        public string Mesage { get; set; }
    };
}
