using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Quiz
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            #region EnableCors
            services.AddCors(options =>
                        {
                            options.AddPolicy("CORS", corsPolicyBuilder => corsPolicyBuilder
                                 .AllowAnyOrigin()
                                // Apply CORS policy for any type of origin  
                                .AllowAnyMethod()
                                // Apply CORS policy for any type of http methods  
                                .AllowAnyHeader()
                                // Apply CORS policy for any headers  
                                .AllowCredentials()
                                //.SetIsOriginAllowedToAllowWildcardSubdomains()
                                );
                            // Apply CORS policy for all users  
                        });
            #endregion

            #region Create DB Context For Quiz Project
            services.AddDbContext<QuizContext>(opt => opt.UseInMemoryDatabase("quiz"));
            #endregion

            #region Add DB Context for IdentityUser and then add Identity user to this context
            services.AddDbContext<UserDbContext>(opt => opt.UseInMemoryDatabase("user"));
            services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<UserDbContext>();
            #endregion

            #region Authentication
            //we try to decode the token with this signinkey so in account controller we should sigin the token with same signinkey :)
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is a secret pharase")); //actually this string should be stored in a secured configuration documents

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            });
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            #region Authentication
            app.UseAuthentication();
            #endregion

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            #region EnableCors
            app.UseCors("CORS");
            #endregion

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
