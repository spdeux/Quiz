using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Quiz.Model;

namespace Quiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CORS")]
    public class AccountController : ControllerBase
    {
        readonly UserManager<IdentityUser> userManager;
        readonly SignInManager<IdentityUser> signInManager;
        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Credentials credentials)
        {
            var user = new IdentityUser { UserName = credentials.Email, Email = credentials.Email };
            var result = await userManager.CreateAsync(user, credentials.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await signInManager.SignInAsync(user, isPersistent: false); //because we don't use cookie and be stateless so we set ispersistent:false
            var token = CreateToken(user);

            return Ok(new JsonResult(token));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {
            var result = await signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, false, false);

            if (!result.Succeeded)
                return BadRequest();

            var user = await userManager.FindByEmailAsync(credentials.Email);
            var token = CreateToken(user);

            return Ok(new JsonResult(token));
        }

        private string CreateToken(IdentityUser user)
        {
            #region Save userId in Token, so we should use Claim to keep userId and then pass it to JwtSecurityToken
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,user.Id)
            };
            #endregion

            #region Sign in Token with the same Key which used in Startup class and then pass it to JwtSecurityToken
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is a secret pharase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            #endregion

            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return token;
        }
    }
}