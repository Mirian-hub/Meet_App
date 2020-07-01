using System.Threading.Tasks;
using MeetApp.API.Data;
using MeetApp.API.DTOs;
using MeetApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace MeetApp.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthorisationRepo _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthorisationRepo repo, IConfiguration config) 
        {
            this._repo = repo;
            this._config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register (UserForRegistrationDto user)
        {
           user.UserName = user.UserName.ToLower();
           if(await _repo.UserExists(user.UserName))
             return BadRequest("user with such name already exists ");
           var userToCreat = new User {
             Username = user.UserName   
           };  
           var createdUser = await _repo.Register(userToCreat, user.Password);
           return  StatusCode(201);         
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto) 
        {
          var userFromRepo =await _repo.Login(userForLoginDto.UserName, userForLoginDto.Password);
          if(userFromRepo==null)
           return Unauthorized();
          
          var claims = new[] 
          {
            new Claim (ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
            new Claim (ClaimTypes.Name, userFromRepo.Username)
          };
          var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
          var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
          var tokenDescriptor = new SecurityTokenDescriptor
          {
           Subject = new ClaimsIdentity(claims),
           Expires = DateTime.Now.AddHours(1),
           SigningCredentials = credentials
          };

          var tokenhandler = new JwtSecurityTokenHandler(); 
          var token = tokenhandler.CreateToken(tokenDescriptor);
          return Ok(new {
            token = tokenhandler.WriteToken(token)
          });
        }
    }
}