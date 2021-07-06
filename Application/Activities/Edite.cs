using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edite
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Actvity { get; set; }

        }


        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Actvity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activ = await _context.Activities.FindAsync(request.Actvity.id);
                if(activ==null)return null;
                _mapper.Map(request.Actvity,activ);
               var res =await _context.SaveChangesAsync()>0;
               if(!res) return Result<Unit>.Failuire("failed to Edite Activity");
                return Result<Unit>.Success( Unit.Value);

            }
        }
    }
}