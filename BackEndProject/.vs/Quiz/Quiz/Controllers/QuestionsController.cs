using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quiz.Model;
using Microsoft.EntityFrameworkCore;

namespace Quiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CORS")]
    public class QuestionsController : ControllerBase
    {
        readonly QuizContext Context;
        public QuestionsController(QuizContext context)
        {
            this.Context = context;
        }


        // GET api/values
        [HttpGet]
        [EnableCors("CORS")]
        public ActionResult<IEnumerable<Question>> Get()
        {
            return Context.Questions;
        }

        // GET: api/Question/5
        [HttpGet("{quizId}")]
        public IEnumerable<Question> Get([FromRoute]int quizId)
        {

            return Context.Questions.Where(q => q.QuizId == quizId);
        }

        // POST api/values
        [HttpPost]
        [EnableCors("CORS")]
        public async Task<IActionResult> Post([FromBody] Question question)
        {
            var quiz = Context.Quiz.SingleOrDefault(q => q.Id == question.QuizId);

            if (quiz == null)
                return NotFound();

            Context.Questions.Add(question);
            await Context.SaveChangesAsync();

            return Ok(question);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        [EnableCors("CORS")]
        public async Task<IActionResult> Put(int id, [FromBody] Question question)
        {
            if (id != question.Id)
                return BadRequest();

            Context.Entry(question).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return Ok(question);
        }
    }
}