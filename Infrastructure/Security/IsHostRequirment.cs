using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirment : IAuthorizationRequirement
    {

    }
    public class IsHostRequirmentHandler : AuthorizationHandler<IsHostRequirment>
    {
        private readonly DataContext dbcontext;
        private readonly IHttpContextAccessor httpContextAccessor;
        public IsHostRequirmentHandler(DataContext dbcontext, IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.dbcontext = dbcontext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirment requirement)
        {
            var userid = context.User.FindFirstValue(ClaimTypes.NameIdentifier) ;
            if(userid==null) return Task.CompletedTask;
            var activityid= Guid.Parse(httpContextAccessor.HttpContext?.Request.RouteValues
            .SingleOrDefault(x=>x.Key=="id").Value?.ToString() );
            var attendee=dbcontext.ActivityAttendees
            .AsNoTracking()
            .SingleOrDefaultAsync(x=>x.ActivityId== activityid&&x.AppUserId==userid).Result;
            if(attendee==null) return Task.CompletedTask;
            if(attendee.IsHost) context.Succeed(requirement);    
            return Task.CompletedTask;
        }
    }
}
