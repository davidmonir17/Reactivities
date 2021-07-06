using System.Text;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extentions
{
    public static class IdentityServiceExtention
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection service,IConfiguration config)
        {
            service.AddIdentityCore<AppUser>(opt =>{
                opt.Password.RequireNonAlphanumeric=false;
            }).AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();
                    var key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            service.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt=>{

                opt.TokenValidationParameters=new TokenValidationParameters
                {
                    ValidateIssuerSigningKey=true   ,
                    IssuerSigningKey=key,
                    ValidateIssuer=false,
                    ValidateAudience=false,

                };
                opt.Events=new JwtBearerEvents
                {
                    OnMessageReceived= context=>
                    {
                        var accessToken=context.Request.Query["access_token"];
                        var path=context.HttpContext.Request.Path;
                        if(!string.IsNullOrEmpty(accessToken)&&(path.StartsWithSegments("/chat")))
                        {
                            context.Token=accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            service.AddAuthorization(opt=>{
                opt.AddPolicy("IsActivityHost",policy=>{
                    policy.Requirements.Add(new IsHostRequirment());
                });
            });
            service.AddTransient<IAuthorizationHandler,IsHostRequirmentHandler>();
            service.AddScoped<TokenServices>();
            return service;
        }
    }
}