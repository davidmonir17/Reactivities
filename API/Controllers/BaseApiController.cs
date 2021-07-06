using API.Extentions;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class BaseApiController:ControllerBase
    {
        private IMediator _mediator;

        protected IMediator mediator=> _mediator ??=HttpContext.RequestServices.GetService<IMediator>();
        

        protected ActionResult HandelResult<T>(Result<T> res)
        {
            if(res==null) return NotFound();
            if(res.IsSuccess&&res.Value!=null)
                return Ok(res.Value);
            if(res.IsSuccess && res.Value==null)
                return NotFound();
            return BadRequest();
        }


                protected ActionResult HandelPagedResult<T>(Result<PagedList<T>> res)
        {
            if(res==null) return NotFound();
            if(res.IsSuccess&&res.Value!=null)
            {
                Response.AddPaginationHeader(res.Value.CurrentPage,
                res.Value.PageSize,res.Value.TotalCount,res.Value.TotalPages);
                return Ok(res.Value);

            }
            if(res.IsSuccess && res.Value==null)
                return NotFound();
            return BadRequest();
        }

    }
}