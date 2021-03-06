using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity=await _context.Activities.FindAsync(request.id);  
               // if(activity==null) return null;
                _context.Remove(activity);
                var re=await _context.SaveChangesAsync()>0;
                if(!re) return Result<Unit>.Failuire("Failed to Delete Activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}