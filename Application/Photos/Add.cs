using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
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

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user= await context.Users.Include(p=>p.Photos)
                .FirstOrDefaultAsync(x=>x.UserName==userAccessor.GetUsername());

                if(user==null) return null;

                var PhotoUploadResult= await photoAccessor.AddPhoto(request.File);
                var photo=new Photo{
                    Url=PhotoUploadResult.Url,
                    Id=PhotoUploadResult.PublicId
                };

                if(!user.Photos.Any(x=>x.IsMain)) photo.IsMain=true;
                user.Photos.Add(photo);
                var result=await context.SaveChangesAsync()>0;
                if(result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failuire("Problem adding photo");
                
            }
        }
    }
}