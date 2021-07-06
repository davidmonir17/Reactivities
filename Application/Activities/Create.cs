using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Actvity { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Actvity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user= await _context.Users.FirstOrDefaultAsync(x=>
                x.UserName==userAccessor.GetUsername());
                var atte=new ActivityAttendee
                {
                    AppUser=user,
                    Activity=request.Actvity,
                    IsHost=true
                };
                request.Actvity.attendence.Add(atte);
                _context.Activities.Add(request.Actvity);

                var res = await _context.SaveChangesAsync() > 0;
                if (!res) return Result<Unit>.Failuire("failed to Creae Activity");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}