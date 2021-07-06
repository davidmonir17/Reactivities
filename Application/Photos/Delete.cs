using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IphotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IphotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.photoAccessor = photoAccessor;
                this.context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user= await context.Users.Include(p=>p.Photos)
                .FirstOrDefaultAsync(x=>x.UserName==userAccessor.GetUsername());

                if(user==null) return null;
                
                var photo=user.Photos.FirstOrDefault(x=>x.Id==request.Id);
                if(photo==null) return null;
                if(photo.IsMain)return Result<Unit>.Failuire("you cannot delete your main photo");

                var result= await photoAccessor.DeletePhoto(photo.Id);
                if(result==null)return Result<Unit>.Failuire("Problem deleting photo from Cloudinary");

                user.Photos.Remove(photo);
                var success=await context.SaveChangesAsync()>0;
                if(success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failuire("Problem deleting photo from API");
            }
        }
    }
}