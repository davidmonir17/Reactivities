using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using System.Threading;
using Microsoft.AspNetCore.Authorization;
using Application.Core;

namespace API.Controllers
{
    
    public class ActivitiesController : BaseApiController
    {
    
        [HttpGet]
        public async Task<IActionResult> GetActivities([FromQuery]ActivityParams param)
        {
            return HandelPagedResult(await mediator.Send(new List.Query{Params=param}));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandelResult( await mediator.Send(new Details.Query{id=id})); 
            
        }

        [HttpPost]
        public async Task<IActionResult>CreateActivity(Activity activity)
        {
            return HandelResult(await mediator.Send(new Create.Command{Actvity=activity}));
        }
    [Authorize(Policy="IsActivityHost")]
    [HttpPut("{id}")]

    public async Task<IActionResult>EditeActivity(Guid id,Activity activity)
    {
        activity.id=id;
        return HandelResult(await mediator.Send(new Edite.Command{Actvity=activity}));
    }

    [Authorize(Policy="IsActivityHost")]
    [HttpDelete("{id}")]
    public async Task<IActionResult>DeleteActivity(Guid id)
    {
        return HandelResult(await mediator.Send(new Delete.Command{id=id}));
    }

    [HttpPost("{id}/attend")]

    public async Task<IActionResult> Attend(Guid id)
    {
        return HandelResult(await mediator.Send(new UpdateAttendence.Command{Id=id} ));
        
    }
    }
} 