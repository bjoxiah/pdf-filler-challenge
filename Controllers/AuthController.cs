using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DotnetCore.Data;
using DotnetCore.Dto;
using DotnetCore.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DotnetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _auth;
        private readonly IConfiguration _config;
        public AuthController(IConfiguration config, IAuthRepository auth) 
        {
            _auth = auth;
            _config = config;
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            // validate model input
            if (!ModelState.IsValid) 
                return BadRequest("Login details required!"); 
            
            // initiate a login
            var userLogin = await _auth.Login(login.Username, login.Password);
            // var user = await _auth.FetchUser(userLogin.UserID);
            // var userToReturn = Json.serialize<>(user);
            if(userLogin == null)
                return BadRequest("Invalid Credentials!");

            //generate tokens
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userLogin.UserID.ToString()),
                    new Claim(ClaimTypes.Name, userLogin.Username.ToString())
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            var obj = new Dictionary<string, string>();
            obj.Add("token", tokenString);
            return Ok(obj);
        }

        // POST api/auth/register
        [Authorize]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginDto login)
        {
            // validate model input
            if (!ModelState.IsValid) 
                return BadRequest("User details required!"); 

            if (await _auth.CheckUsername(login.Username))
                return BadRequest("Username already exist!");

            // new user object
            byte[] passwordHash, passwordSalt;
            _auth.CreatePasswordHash(login.Password, out passwordHash, out passwordSalt);
            var user = new User {
                Username = login.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            var userCreated = await _auth.Register(user);
            return StatusCode(200);
        }
        
    }
}