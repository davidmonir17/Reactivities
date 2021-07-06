using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ActivityDTO>>>
        {
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDTO>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> logger;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.mapper = mapper;

                _context = context;
            }

            public async Task<Result<PagedList<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  _context.Activities
                .Where(d=>d.Date>=request.Params.StartDate)
                .OrderBy(d=>d.Date)
                .ProjectTo<ActivityDTO>(mapper.ConfigurationProvider,new {currentUsername=userAccessor.GetUsername()} )
                .AsQueryable();
                    if(request.Params.IsGoing&&!request.Params.IsHost)
                    {
                        query=query.Where(x=>x.attendence.Any(a=>a.Username==userAccessor.GetUsername())); 
                    }
                    if(!request.Params.IsGoing&& request.Params.IsHost)
                    {
                        query=query.Where(x=>x.HostUsername==userAccessor.GetUsername());
                    }
                return Result<PagedList<ActivityDTO>>.Success(
                    await PagedList<ActivityDTO>.CreateAsync(query,request.Params.PageNumber,request.Params.pageSize)
                );
            }
        }
    }
}