using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz.Model
{
    public class Quiz
    {
        public int? Id { get; set; }
        public string Title { get; set; }

        #region save creatorId or userId in quize object
        public string OwnerId { get; set; }
        #endregion
    }
}
