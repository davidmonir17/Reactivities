using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly TokenServices tokenServices;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenServices tokenServices)
        {
            this.tokenServices = tokenServices;
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login(LoginDTo loginDTo)
        {
            var user = await userManager.Users.Include(p=>p.Photos)
            .FirstOrDefaultAsync(x=>x.Email==loginDTo.Email);
            if (user == null) return Unauthorized();
            var result = await signInManager.CheckPasswordSignInAsync(user, loginDTo.Password, false);
            if (result.Succeeded)
            {
            return CreateUSerObject(user);
            }
            return Unauthorized();
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await userManager.Users.AnyAsync(x=>x.Email==registerDto.Email))
            {
                ModelState.AddModelError("email","Email Taken");
                return ValidationProblem();
            }
            if(await userManager.Users.AnyAsync(x=>x.UserName==registerDto.UserName))
            {
            ModelState.AddModelError("username","Username Taken");

                return ValidationProblem();
            }
            var user=new AppUser{
DisplayName=registerDto.DisplayName, 
Email=registerDto.Email,
UserName=registerDto.UserName,
            };
            var res=await userManager.CreateAsync(user,registerDto.Password);
            if(res.Succeeded)
            {
                return CreateUSerObject(user);             
            }
            return BadRequest("Problem in Register");
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user=await userManager.Users.Include(p=>p.Photos)
            .FirstOrDefaultAsync(x=>x.Email== User.FindFirstValue(ClaimTypes.Email));
            return CreateUSerObject(user);
        }

        private  UserDto CreateUSerObject(AppUser user)
        {
            return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x=>x.IsMain).Url,
                    Token = tokenServices.CreateToken(user),
                    Username = user.UserName,
                }; 
        }
    }
}