using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendence
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity=await context.Activities
                .Include(a=>a.attendence).ThenInclude(u=>u.AppUser)
                .SingleOrDefaultAsync(x=>x.id==request.Id);
                    if(activity==null)return null;

                var user= await context.Users.FirstOrDefaultAsync(x=>x.UserName==userAccessor.GetUsername());
                if(user==null)return null;

                var hostUsername=  activity.attendence.FirstOrDefault(x=>x.IsHost)?.AppUser?.UserName;

                var attendence= activity.attendence.FirstOrDefault(x=>x.AppUser.UserName==user.UserName);
                if(attendence!=null && hostUsername==user.UserName)
                activity.ISCancelled=!activity.ISCancelled;

                if(attendence!=null && hostUsername != user.UserName)
                activity.attendence.Remove(attendence);

                if(attendence==null)
                {
                    attendence=new ActivityAttendee{
                        AppUser=user,
                        Activity=activity,
                        IsHost=false
                    };
                    activity.attendence.Add(attendence);
                }
                var res= await context.SaveChangesAsync()>0;
                return res? Result<Unit>.Success(Unit.Value):Result<Unit>.Failuire("Problem Updating attendence");
            }
        }
    }
}   