using AirBnb.Core.Shared.Contracts;
using AirBnb.Core.Shared.Services.Email;

namespace AirBnb.Data.Shared.Contracts
{
    public class BackgroundJobService : IBackgroundJobService
    {
        private IScheduleJobService _jobService;
        private ISmtpEmailService _emailService;
        public BackgroundJobService(IScheduleJobService jobService, ISmtpEmailService emailService)
        {
            _jobService = jobService;
            _emailService = emailService;
        }

        public IScheduleJobService scheduledJobService => _jobService;

        public string? SendEmailContent(string email, string subject, string emailContent, DateTimeOffset enqueueAt)
        {
            var emailRequest = new MailRequest
            {
                ToAddress = email,
                Body = emailContent,
                Subject = subject
            };
            try
            {

                var jobId = _jobService.Schedule(() => _emailService.SendEmail(emailRequest), enqueueAt);
                return jobId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
