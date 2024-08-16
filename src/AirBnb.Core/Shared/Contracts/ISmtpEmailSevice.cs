using AirBnb.Core.Shared.Services.Email;

namespace AirBnb.Core.Shared.Contracts
{
    public interface ISmtpEmailService:IEmailService<MailRequest>
    {
    }
}
