using System.Threading.Tasks;
using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController:BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            return HandelResult(await mediator.Send(new FollowToggle.Command{TargetUsername=username}));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowings(string username,string predicate)
        {
            return HandelResult(await mediator.Send(new List.Query{Username=username,Predicate=predicate}));
            
        }
    }
}