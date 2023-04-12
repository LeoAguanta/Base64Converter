namespace Base64Converter.Hub
{
    public interface IHubClient
    {
        Task SendDecodedText(string text);
    }
}
