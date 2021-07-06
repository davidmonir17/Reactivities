using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController:BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.Command command)
        {
            return HandelResult(await mediator.Send(command));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return HandelResult(await mediator.Send(new Delete.Command{Id=id}));
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMAin(string id)
        {
            return HandelResult(await mediator.Send(new SetMain.Command{Id=id}));
        }
    }
}