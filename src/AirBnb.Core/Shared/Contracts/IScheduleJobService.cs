using System.Linq.Expressions;

namespace AirBnb.Core.Shared.Contracts
{
    public interface IScheduleJobService
    {
        #region Fire And Forget
        string Enqueue(Expression<Action> functionCall);
        string Enqueue<T>(Expression<Action<T>> functionCall);
        #endregion


        #region Delay 
        string Schedule(Expression<Action> functionCall, TimeSpan delay);
        string Schedule<T>(Expression<Action<T>> functionCAll, TimeSpan delay);
        string Schedule(Expression<Action> functionCall, DateTimeOffset enqueueAt);
        //string Schedule<T>(Expression<Action<T>> functionCall, DateTimeOffset enqueueAt);
        #endregion


        #region Continuos jobs
        string ContinueQueueWith(string parentJobId, Expression<Action> functionCall);
        #endregion
        bool Delete(string jobId);
        bool Requeue(string jobId);
    }
}




/*
 * 
 * /////////step 1: BackgroundJobService :IBackgroundJobService
 * -  private readonly IScheduleJobService _jobService
 * -  private readonly ISmtpService _emailService;
 * -  public IScheduleJobService scheduleJobService=> _jobService;
 * - public string SendEmailContent()
 * {
 * var data= await _jobService(()=>  {_emailService.SendEmail(request)},EnqueueAt)
 * }
 * 
 * /////////step 2:  IBackgroundJobService 
 * - IScheduledJobService scheduleJobService {get;}
 * - string SendEmailContent()
 * 
 * 
 * /////////step 3: IScheduleJobService
 * -   string Schedule(Expression<Action> functionCall, DateTimeOffset enqueueAt);
 * - Delete()
 * 
 * /////////step 4: ScheduleJobService:IScheduleJobService
 * -public string Enqueue(Expression<Action> functionCall,EnqueueAt);
 * => BackgroundJob.Schedule(functionCall,enqueueAt);
 * 
 * /////////step 5: ISmtpService:IEmailService<MailRequest>
 * 
 * 
 * /////////step 6: IEmailService<T> where T: class
 * {
 *      Task SendEmailAsync(T request, CancellationToken cancellationToken = new CancellationToken());
        void SendEmail(T request);
 * }
 * /////////step 7: SmtpService:ISmtpService
 * public async Task SendEmailAsync(MailRequest request, CancellationToken cancellationToken = default)
        {
            var emailMessage = GetMimeMessage(request);
            try
            {
                await _smtpClient.ConnectAsync(_settings.SMTPServer, _settings.Port, _settings.UseSsl, cancellationToken);
                await _smtpClient.AuthenticateAsync(_settings.Username, _settings.Password, cancellationToken);
                await _smtpClient.SendAsync(emailMessage, cancellationToken);
                await _smtpClient.DisconnectAsync(true, cancellationToken);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                await _smtpClient.DisconnectAsync(true, cancellationToken);
                _smtpClient.Dispose();
            }

        }
 * 
 * private MimeMessage GetMimeMessage(MailRequest request)
        {
            var emailMessage = new MimeMessage
            {
                Sender = new MailboxAddress(_settings.DisplayName, request.From ?? _settings.From),
                Subject = request.Subject,
                Body = new BodyBuilder
                {
                    HtmlBody = request.Body
                }.ToMessageBody()
            };
            if (request.ToAddresses.Any())
            {
                foreach (var toAddress in request.ToAddresses)
                {
                    emailMessage.To.Add(MailboxAddress.Parse(toAddress));
                }
            }
            else
            {
                var toAddress = request.ToAddress;
                emailMessage.To.Add(MailboxAddress.Parse(toAddress));
            }
            return emailMessage;
        }
 * 
 * 
 * 
 * 
 * 
 * / * */
