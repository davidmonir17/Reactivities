using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController:BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandelResult(await mediator.Send(new Details.Query{Username=username}));
        }

        [HttpPut]
        public async Task<IActionResult> Edite(Edit.Command command)
        {
            return HandelResult(await mediator.Send(command));
        }

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetUserActivities(string username,string predicate)
        {
            return HandelResult(await mediator.Send(new ListActivities.Query{Username=username,Predicate=predicate}));
        }
        
    }
}