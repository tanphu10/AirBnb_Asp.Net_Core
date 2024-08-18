using AirBnb.Core.Models.Auth;
using AirBnb.Core.Shared.Contracts;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AirBnb.Api.Controllers.Admin
{
    [Route("api/scheduled-jobs")]
    [ApiController]
    public class ScheduleJobController : ControllerBase
    {
        private readonly IBackgroundJobService _backgroundJobService;

        public ScheduleJobController(IBackgroundJobService backgroundJobService)
        {
            _backgroundJobService = backgroundJobService;

        }
        [HttpPost]
        [Route("send-email-reminder")]
        public IActionResult SendReminderEmail([FromBody] ReminderDto model)
        {

            var jobId = _backgroundJobService.SendEmailContent(model.email, model.subject, model.emailContent, model.enqueueAt);
            return Ok(jobId);
        }
        [HttpDelete]
        [Route("delete/jobId/{id}")]
        public IActionResult DeleteJobId([Required] string id)
        {
            var result = _backgroundJobService.scheduledJobService.Delete(id);
            return Ok(result);
        }
    }
}
