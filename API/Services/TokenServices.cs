using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.Tokens;
// using System.IdentityModel.Tokens.Jwt;
namespace API.Services
{
    public class TokenServices
    {
        private readonly IConfiguration config;
        public TokenServices(IConfiguration config)
        {
            this.config = config;
        }

        public string CreateToken(AppUser appUser)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.Name,appUser.UserName ),
                new Claim(ClaimTypes.NameIdentifier,appUser.Id ),
                new Claim(ClaimTypes.Email,appUser.Email ),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescripe = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescripe);
            return tokenHandler.WriteToken(token);
        }
    }
}